const db = require("../dbInit/dbConn");
const getTransactionCount = require("../transaction-utils/certTransactions")
  .getTransactionCount;
const getRawTransaction = require("../transaction-utils/certTransactions")
  .getRawTransaction;
const signTransaction = require("../transaction-utils/certTransactions")
  .signTransaction;
const send = require("../transaction-utils/certTransactions").send;

async function runner() {
  var result = null;
  db.query("select * from data data where uploaded = 0 limit 100", function (
    err,
    res
  ) {
    if (err) {
      console.log(err);
      throw {
        statusCode: 400,
        customMessage: "Try again later",
      };
    } else if (res.length > 0) {
      result = JSON.stringify(res);
    }
  });
  for (var i = 0; i < result.length; i++) {
    var nonce = await getTransactionCount();
    var rawTransaction = await getRawTransaction(nonce, i.jsonString, i.hashId);
    var transaction = await signTransaction(rawTransaction);
    var done = await send(transaction);
    db.query(
      `update data set transacionHash = '${done.transactionHash}',notify=1,uploaded=1 where hashId = '${result[i].hashId}' `,
      function (err, data) {}
    );
  }
}

module.exports = runner;

//   }
//   var count = 0;
//   await web3.eth.getTransactionCount(addr).then((result) => {
//     count = result;
//     console.log(count);
//   });
//   //   var ll = contract.methods.newCert(
//   //     "000044263e0261b4509562e26d2d8c19",
//   //     '{"email":"ssdcsd","Column 2":"2-Jan","Column 3":"3-Jan","Column 4":"4-Jan"}'
//   //   ).encodeABI();

//   var rawTransaction = {
//     from: addr,
//     gasPrice: web3.utils.toHex(20 * 1e9),
//     gasLimit: web3.utils.toHex(300000),
//     to: contractAddr,
//     value: "0x0",
//     data: contract.methods
//       .newCert(
//         count.toString(),
//         '{"email":"rutwik","Column 2":"2-Jan","Column 3":"3-Jan","Column 4":"4-Jan"}'
//       )
//       .encodeABI(),
//     nonce: web3.utils.toHex(count),
//   };

//   var transaction = new Tx(rawTransaction, {
//     chain: "ropsten",
//     hardfork: "petersburg",
//   });
//   //signing transaction with private key
//   transaction.sign(Buffer.from(pk, "hex"));
//   //sending transacton via web3js module
//   web3.eth
//     .sendSignedTransaction("0x" + transaction.serialize().toString("hex"))
//     .then((res) => {
//       console.log(res);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// .on("transactionHash", console.log);

//   console.log(rawTransaction);
//   process.exit();
