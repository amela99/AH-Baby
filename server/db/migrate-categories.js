const path = require("path");
const Database = require("better-sqlite3");
const db = new Database(path.join(__dirname, "database.db"));

const products = db.prepare("SELECT categories FROM products").all();
const insert = db.prepare("INSERT OR IGNORE INTO categories (name) VALUES (?)");

products.forEach((product) => {
  if (!product.categories) return;
  let cats = [];
  try {
    cats = JSON.parse(product.categories);
  } catch {
    cats = [product.categories];
  }
  cats.forEach((c) => insert.run(c));
});

console.log("Gamla kategorier migrerade till categories-tabellen");
db.close();
