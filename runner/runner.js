const pgp = require("../dbInit/dbConn").pgp;
const getTransactionCount = require("../transaction-utils/certTransactions")
  .getTransactionCount;
const getRawTransaction = require("../transaction-utils/certTransactions")
  .getRawTransaction;
const signTransaction = require("../transaction-utils/certTransactions")
  .signTransaction;
const send = require("../transaction-utils/certTransactions").send;

async function runner() {
  try {
    var result = await pgp.query(
      "select * from certs where uploaded = 0 limit 100"
    );
    for (var i = 0; i < result.length; i++) {
      var nonce = await getTransactionCount();
      var rawTransaction = await getRawTransaction(nonce, i.jsonstring, i.id);
      var transaction = await signTransaction(rawTransaction);
      var done = await send(transaction);
      await pgp.query(
        "update certs set transacionhash = ${transactionhash},notify=1,uploaded=1 where id = ${id}",
        { transactionhash: done.transactionHash, id: result[i].id }
      );
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = runner;
