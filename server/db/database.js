const Database = require("better-sqlite3");
const path = require("path");

// Bestäm den fullständiga sökvägen till databasen
const dbfilePath = path.resolve(process.cwd(), "db/database.db");

// Öppna databasen med better-sqlite3
const db = new Database(dbfilePath, { verbose: console.log }); // Lägg till verbose för att logga SQL-kommandon om du vill

console.log("Connected to the database.");

module.exports = db;
