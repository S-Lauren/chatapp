// here we connect our db. (pool or not)

const mysql = require("mysql2");
const result = require('dotenv').config()
// const dbConfig = require("../config/db.config.json");

const pool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test if DB is connected

if (result.error) {
  throw result.error
} else {
  console.log("Database is connected")
}


module.exports = pool; 
