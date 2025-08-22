const Database = require("better-sqlite3");
const path = require("path");

// Bestäm den fullständiga sökvägen till databasen
const dbfilePath = path.resolve(process.cwd(), "db/database.db");

const db = new Database(dbfilePath, { verbose: console.log });

console.log("Connected to the database.");

module.exports = db;
