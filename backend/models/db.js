// here we connect our db. (pool or not)

const mysql = require("mysql2");
const dbConfig = require("../config/db.config.json");

const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

// Test if DB is connected
pool.query("SELECT * FROM room", (err, result, fields) => {
  if(err) {
    console.log(err)
  } else {
    console.log( `Database is connected`)
    console.log(result)
  }
})

module.exports = pool.promise();