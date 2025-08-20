const Database = require("better-sqlite3");
const db = new Database("db/database.db", { verbose: console.log });

const createTable = `
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    price TEXT,
    description TEXT,
    image TEXT,
    hoverImage TEXT,
    SKU TEXT,
    categories TEXT,
    published_date TEXT,
    url_slug TEXT 
  );
`;
const createOrders = `
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    quantity INTEGER,
    total_price TEXT,
    order_date TEXT,
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
`;

try {
  db.prepare(createTable).run();
  console.log("Products table created (if it didn't exist).");

  db.prepare(createOrders).run();
  console.log("Shopping cart table created (if it didn't exist).");
} catch (err) {
  console.error("Error creating table:", err.message);
}

db.close();
