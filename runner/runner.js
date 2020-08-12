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
    var result = await pgp.query("select * from certs where uploaded = false");
    console.log(result.length);
    for (var i = 0; i < result.length; i++) {
      var nonce = await getTransactionCount();
      console.log(nonce);
      var rawTransaction = await getRawTransaction(
        nonce,
        result[i].jsonstring,
        result[i].id
      );
      var transaction = await signTransaction(rawTransaction);
      var done = await send(transaction);
      await pgp.query(
        "update certs set transactionhash = ${transactionhash},notify=true,uploaded=true where id = ${id}",
        { transactionhash: done.transactionHash, id: result[i].id }
      );
      console.log(done.transactionHash);
    }
  } catch (err) {
    console.log(err);
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
