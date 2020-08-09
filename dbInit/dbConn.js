const config = require("config");
const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
  host: config.get("mysqlHost"),
  user: config.get("mysqlUser"),
  password: config.get("mysqlPassword"),
  database: config.get("mysqlDatabase"),
});

module.exports = db;
