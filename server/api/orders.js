const express = require("express");
const router = express.Router();
const Database = require("better-sqlite3");
const db = new Database("db/database.db");

router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

//  helper för att hämta korgen
function getCart() {
  return db
    .prepare(
      `
      SELECT p.id, p.name, p.price, p.image, o.quantity, o.total_price
      FROM orders o
      JOIN products p ON o.product_id = p.id
    `
    )
    .all();
}

//  hämta korgen
router.get("/", (req, res) => {
  const cart = getCart();
  res.json(cart);
});

//  lägg till i korgen
router.post("/add", (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity || isNaN(quantity)) {
    return res.json({
      success: false,
      message: "Produkt-ID eller antal saknas eller är ogiltigt",
    });
  }

  const product = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(productId);

  if (product) {
    const totalPrice = (parseFloat(product.price) * quantity).toFixed(2);
    try {
      db.prepare(
        "INSERT INTO orders (product_id, quantity, total_price, order_date) VALUES (?, ?, ?, ?)"
      ).run(productId, quantity, totalPrice, new Date().toISOString());

      res.json({ success: true, cart: getCart() }); // 👈 returnera hela korgen
    } catch (error) {
      console.error("Fel vid insättning i databasen:", error.message);
      res.status(500).json({ success: false, message: "Databasfel" });
    }
  } else {
    res.json({ success: false, message: "Produkten finns inte" });
  }
});

//  uppdatera produkt i korgen
router.post("/update", (req, res) => {
  const { productId, quantity } = req.body;
  if (!productId || !quantity || isNaN(quantity)) {
    return res.json({ success: false, message: "Ogiltiga data" });
  }

  const product = db
    .prepare("SELECT * FROM products WHERE id = ?")
    .get(productId);
  if (!product) {
    return res.json({ success: false, message: "Produkten finns inte" });
  }

  try {
    db.prepare(
      "UPDATE orders SET quantity = ?, total_price = ? WHERE product_id = ?"
    ).run(
      quantity,
      (parseFloat(product.price) * quantity).toFixed(2),
      productId
    );

    res.json({ success: true, cart: getCart() }); // 👈 returnera hela korgen
  } catch (error) {
    console.error("Fel vid uppdatering:", error);
    res.status(500).json({ success: false, message: "Serverfel" });
  }
});

// ta bort produkt från korgen
router.delete("/remove", (req, res) => {
  const productId = parseInt(req.query.productId);
  if (isNaN(productId)) {
    return res.status(400).json({ success: false, message: "Ogiltigt ID" });
  }

  try {
    db.prepare("DELETE FROM orders WHERE product_id = ?").run(productId);
    res.json({ success: true, cart: getCart() }); //  returnera hela korgen
  } catch (error) {
    console.error("Fel vid borttagning:", error);
    res.status(500).json({ success: false, message: "Serverfel" });
  }
});

module.exports = router;
