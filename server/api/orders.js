const express = require("express");
const router = express.Router();
const Database = require("better-sqlite3");
const db = new Database("db/database.db");

// Logga alla requests
router.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Hjälpfunktion för att hämta korgen
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

// Hämta korgen
router.get("/", (req, res) => {
  const cart = getCart();
  res.json(cart);
});

// Lägg till i korgen
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

      res.json({ success: true, cart: getCart() });
    } catch (error) {
      console.error("Fel vid insättning i databasen:", error.message);
      res.status(500).json({ success: false, message: "Databasfel" });
    }
  } else {
    res.json({ success: false, message: "Produkten finns inte" });
  }
});

// Uppdatera produkt i korgen
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

    res.json({ success: true, cart: getCart() });
  } catch (error) {
    console.error("Fel vid uppdatering:", error);
    res.status(500).json({ success: false, message: "Serverfel" });
  }
});

// Ta bort produkt från korgen
router.delete("/remove", (req, res) => {
  const productId = parseInt(req.query.productId);
  if (isNaN(productId)) {
    return res.status(400).json({ success: false, message: "Ogiltigt ID" });
  }

  try {
    db.prepare("DELETE FROM orders WHERE product_id = ?").run(productId);
    res.json({ success: true, cart: getCart() });
  } catch (error) {
    console.error("Fel vid borttagning:", error);
    res.status(500).json({ success: false, message: "Serverfel" });
  }
});

// Checkout - spara order i customer_orders
router.post("/checkout", (req, res) => {
  const {
    cart,
    firstName,
    lastName,
    email,
    address,
    postcode,
    city,
    newsletter,
  } = req.body;

  if (!cart || cart.length === 0) {
    return res.json({ success: false, message: "Din varukorg är tom" });
  }

  try {
    const orderDate = new Date().toISOString();

    // Spara order i customer_orders
    const result = db
      .prepare(
        `
      INSERT INTO customer_orders 
      (first_name, last_name, email, address, postcode, city, newsletter, order_date)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `
      )
      .run(
        firstName,
        lastName,
        email,
        address,
        postcode,
        city,
        newsletter ? 1 : 0,
        orderDate
      );

    const orderId = result.lastInsertRowid;

    // Töm korgen

    res.json({ success: true, orderId });
  } catch (error) {
    console.error("Fel vid checkout:", error);
    res.status(500).json({ success: false, message: "Serverfel" });
  }
});

// Hämta specifik order
router.get("/:orderId", (req, res) => {
  const orderId = parseInt(req.params.orderId);
  if (isNaN(orderId)) {
    return res
      .status(400)
      .json({ success: false, message: "Ogiltigt order-ID" });
  }

  const order = db
    .prepare("SELECT * FROM customer_orders WHERE id = ?")
    .get(orderId);
  if (!order) {
    return res
      .status(404)
      .json({ success: false, message: "Order hittades inte" });
  }

  res.json(order);
});

module.exports = router;
