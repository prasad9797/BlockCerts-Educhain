const pg = require("pg-promise")();
const config = require("config");
const pgp = pg(
  {
    // host: config.get("pgHost"),
    // port: 5432,
    // database: config.get("pgDatabase"),
    // user: config.get("pgUser"),
    // password: config.get("pgPassword"),
    host: "localhost",
    port: 5432,
    database: "postgres",
    user: "postgres",
    password: "root",
    //ssl: { rejectUnauthorized: false },
  }
  // { rejectUnauthorized: false }
);

module.exports = { pgp };
