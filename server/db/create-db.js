const path = require("path");
const Database = require("better-sqlite3");
const dbPath = path.join(__dirname, "database.db");
const db = new Database(dbPath, { verbose: console.log });

// === Products table ===
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
    gender TEXT,
    published_date TEXT,
    url_slug TEXT 
  );
`;

// === Orders table ===
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

// === Customer orders table ===
const createCustomerOrders = `
  CREATE TABLE IF NOT EXISTS customer_orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT,
    last_name TEXT,
    email TEXT,
    address TEXT,
    postcode TEXT,
    city TEXT,
    newsletter INTEGER,
    order_date TEXT
  );
`;

// === Favorites table (user ↔ products) ===
const createFavorites = `
  CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    product_id INTEGER,
    created_at TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    UNIQUE(user_id, product_id) 
  );
`;

// === Users table (for customers + admins) ===
const createUsers = `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    email TEXT UNIQUE,
    password TEXT,
    role TEXT DEFAULT 'customer',  
    created_at TEXT
  );
`;

try {
  db.prepare(createTable).run();
  db.prepare(createOrders).run();
  db.prepare(createCustomerOrders).run();
  db.prepare(createFavorites).run();
  db.prepare(createUsers).run();

  console.log("Tables created (if they didn't exist).");
} catch (err) {
  console.error("Error creating table:", err.message);
}

db.close();
