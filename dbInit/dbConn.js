const config = require("config");
const mysql = require("mysql");

// Create connection
const db = mysql.createConnection({
  host: "127.0.0.1", //config.get("mysqlHost"),
  user: "sdxds", //config.get("mysqlUser"),
  password: "sdxds", //config.get("mysqlPassword"),
  // database: config.get("mysqlDatabase"),
  database: "dataa",
});

const mysql2 = require("mysql2");
// create the connection
const con = mysql2.createConnection({
  host: "localhost",
  user: "sdxds",
  database: "dataa",
  password: "sdxds",
});

const pg = require("pg-promise")();

const pgp = pg(
  {
    host: "ec2-35-175-155-248.compute-1.amazonaws.com",
    port: 5432,
    database: "d2pl1qfka3fv3g",
    user: "kxkarryozqpvds",
    password:
      "5752523dbb73b085e700ac5df86da2e69fc4479c643a060ca3edb8724ce84c55",
    ssl: { rejectUnauthorized: false },
  }
  // { rejectUnauthorized: false }
);

module.exports = { con, db, pgp };
