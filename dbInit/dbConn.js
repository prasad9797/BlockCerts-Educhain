const pg = require("pg-promise")();

// const pgp = pg(
//   {
//     host: "ec2-35-175-155-248.compute-1.amazonaws.com",
//     port: 5432,
//     database: "d2pl1qfka3fv3g",
//     user: "kxkarryozqpvds",
//     password:
//       "5752523dbb73b085e700ac5df86da2e69fc4479c643a060ca3edb8724ce84c55",
//     ssl: { rejectUnauthorized: false },
//   }
//   // { rejectUnauthorized: false }
// );
const pgp = pg(
  {
    host: "ec2-23-20-168-40.compute-1.amazonaws.com",
    port: 5432,
    database: "dfmjd4oi666vnr",
    user: "gtqieronzaaqya",
    password:
      "252ac55bf7e8719a7bf34627a2c84606b5b84d0b31a2c2392d13474af05563ac",
    ssl: { rejectUnauthorized: false },
  }
  // { rejectUnauthorized: false }
);

module.exports = { pgp };
