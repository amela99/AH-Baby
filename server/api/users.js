const express = require("express");
const router = express.Router();
const Database = require("better-sqlite3");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = new Database("db/database.db");
const SECRET = "supersecret";

// Register
router.post("/register", (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password)
      return res.status(400).json({ error: "Alla fält måste fyllas i" });

    const existing = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email);
    if (existing)
      return res.status(400).json({ error: "E-post används redan" });

    const hashed = bcrypt.hashSync(password, 10);
    const isAdmin = email.endsWith("@admin.com") ? 1 : 0;

    db.prepare(
      "INSERT INTO users (username, email, password, admin) VALUES (?, ?, ?, ?)"
    ).run(username, email, hashed, isAdmin);

    res.json({ success: true, message: "Användare skapad!" });
  } catch (err) {
    console.error("Register error:", err.message);
    res.status(500).json({ error: "Serverfel vid registrering" });
  }
});

// Login
router.post("/login", (req, res) => {
  try {
    const { email, password } = req.body;
    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email);

    if (!user)
      return res.status(400).json({ error: "Fel e-post eller lösenord" });

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid)
      return res.status(400).json({ error: "Fel e-post eller lösenord" });

    const token = jwt.sign(
      { id: user.id, email: user.email, admin: user.admin },
      SECRET,
      { expiresIn: "1h" }
    );

    // 🟢 Spara token i databasen
    db.prepare("UPDATE users SET token = ? WHERE id = ?").run(token, user.id);

    res.json({ success: true, token, admin: user.admin });
  } catch (err) {
    console.error("Login error:", err.message);
    res.status(500).json({ error: "Serverfel vid login" });
  }
});

// Middleware: skydda routes
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Ingen token" });

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Ogiltig token" });

    // 🟢 Kontrollera att token finns i databasen
    const user = db
      .prepare("SELECT * FROM users WHERE id = ? AND token = ?")
      .get(decoded.id, token);

    if (!user)
      return res.status(403).json({ error: "Token matchar inte användaren" });

    req.user = user; // skickar vidare användardata
    next();
  });
}

// Exempel: skyddad profil-route
router.get("/profile", authenticateToken, (req, res) => {
  const user = db
    .prepare(
      "SELECT id, username, email, admin, created_at FROM users WHERE id = ?"
    )
    .get(req.user.id);
  res.json(user);
});

module.exports = router;
