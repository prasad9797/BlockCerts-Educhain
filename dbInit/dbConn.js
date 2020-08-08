const config = require("config");
const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
  host: "remotemysql.com",
  user: "hOU1qOK3ou",
  password: "173WBaFw69",
  database: "hOU1qOK3ou",
});

module.exports = db;
