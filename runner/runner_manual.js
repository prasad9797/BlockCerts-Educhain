const pgp = require("../dbInit/dbConn").pgp;
const getTransactionCount = require("../transaction-utils/certTransactions")
  .getTransactionCount;
const getRawTransaction = require("../transaction-utils/certTransactions")
  .getRawTransaction;
const signTransaction = require("../transaction-utils/certTransactions")
  .signTransaction;
const send = require("../transaction-utils/certTransactions").send;

const nodemailer = require("nodemailer");
const config = require("config");
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.get("SMTPmail"),
    pass: config.get("SMTPpassword"),
  },
});



const runner = require("./runner.js");
//const emailrunner = require("./emailrunner.js");
runner();
//emailrunner();
