const express = require("express");
const app = express();
const Database = require("better-sqlite3");
const productsRouter = require("./api/products");
const ordersRouter = require("./api/orders");
const usersRouter = require("./api/users");

app.use(express.json());
// Använd middleware för att hantera /products endpoints
app.use("/api/products", productsRouter);
app.use("/api/cart", ordersRouter);
app.use("/api/users", usersRouter);

app.listen(8080, () => {
  console.log("Server running on http://localhost:8080");
});
