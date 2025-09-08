const express = require("express");
const router = express.Router();
const Database = require("better-sqlite3");
const db = new Database("db/database.db");

// Logga alla requests
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

router.get("/", (req, res) => {
  try {
    const rows = db.prepare("SELECT * FROM categories").all();
    res.json(rows);
  } catch (err) {
    console.error("Error fetching categories:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/", (req, res) => {
  const { categories } = req.body;
  if (!Array.isArray(categories) || categories.length === 0) {
    return res.status(400).json({ error: "Du måste skicka minst en kategori" });
  }

  const stmt = db.prepare("INSERT OR IGNORE INTO categories (name) VALUES (?)");
  categories.forEach((c) => stmt.run(c));

  const rows = db.prepare("SELECT * FROM categories").all();
  res.status(201).json({ message: "Kategorier skapade", categories: rows });
});

router.delete("/:id", (req, res) => {
  const result = db
    .prepare("DELETE FROM categories WHERE id = ?")
    .run(req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: "Kategorin finns inte" });
  }
  res.status(200).json({ message: "Kategori borttagen", id: req.params.id });
});

module.exports = router;
