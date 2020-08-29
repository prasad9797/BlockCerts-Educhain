const pg = require("pg-promise")();
const config = require("config");
const pgp = pg(
  {
    host: config.get("pgHost"),
    port: 5433,
    database: config.get("pgDatabase"),
    user: config.get("pgUser"),
    password: config.get("pgPassword"),
    ssl: { rejectUnauthorized: false },
  }
  // { rejectUnauthorized: false }
);

module.exports = { pgp };
