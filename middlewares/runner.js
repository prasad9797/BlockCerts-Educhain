const db = require("../dbInit/dbConn");
const Tx = require("ethereumjs-tx").Transaction;

const Web3 = require("web3");
const infura = `https://ropsten.infura.io/v3/02c413bd8e8d48bcbae27daa4ae9ce8b`;
const web3 = new Web3(new Web3.providers.HttpProvider(infura));
const addr = "0x5A91B43571183B22925bc7DE4d4B9Bc4D5B46B7E";
const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_keys",
        type: "string",
      },
      {
        internalType: "string",
        name: "_certs",
        type: "string",
      },
    ],
    name: "newCert",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "certificates",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
const pk = "02167d27c57067d66a9fd452e3a7cc7347e78eefe0a473750c7d4297fbe414bc";
const contractAddr = "0x715925ff36cf50bd3D3e134f207625Dd9EBD0510";
var contract = new web3.eth.Contract(abi, contractAddr);

async function runner() {
  //   db.query("select * from data data where uploaded = 0", function (err, res) {
  //     if (err) {
  //       console.log(err);
  //       throw {
  //         statusCode: 400,
  //         customMessage: "Try again later",
  //       };
  //     } else if (res.length > 0) {

  //     }
  // });
  var count = 0;
  await web3.eth.getTransactionCount(addr).then((result) => {
    count = result;
    console.log(count);
  });
  //   var ll = contract.methods.newCert(
  //     "000044263e0261b4509562e26d2d8c19",
  //     '{"email":"ssdcsd","Column 2":"2-Jan","Column 3":"3-Jan","Column 4":"4-Jan"}'
  //   ).encodeABI();

  var rawTransaction = {
    from: addr,
    gasPrice: web3.utils.toHex(20 * 1e9),
    gasLimit: web3.utils.toHex(300000),
    to: contractAddr,
    value: "0x0",
    data: contract.methods
      .newCert(
        count.toString(),
        '{"email":"rutwik","Column 2":"2-Jan","Column 3":"3-Jan","Column 4":"4-Jan"}'
      )
      .encodeABI(),
    nonce: web3.utils.toHex(count),
  };

  var transaction = new Tx(rawTransaction, {
    chain: "ropsten",
    hardfork: "petersburg",
  });
  //signing transaction with private key
  transaction.sign(Buffer.from(pk, "hex"));
  //sending transacton via web3js module
  web3.eth
    .sendSignedTransaction("0x" + transaction.serialize().toString("hex"))
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  // .on("transactionHash", console.log);

  //   console.log(rawTransaction);
  //   process.exit();
}

module.exports = runner;
