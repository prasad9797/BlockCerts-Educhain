const Tx = require("ethereumjs-tx").Transaction;
const Web3 = require("web3");
const config = require("config");
const infuraURL = config.get("infuraEndpoint");
const APIkey = config.get("infuraAPIkey");
const infura = `${infuraURL}/${APIkey}`;
let web3 = new Web3(new Web3.providers.HttpProvider(infura));
const addr = config.get("ethAddress");
// const abi = config.get("abi");
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
const pk = config.get("privateKey");
const contractAddr = config.get("contractAddr");
const chain = config.get("network");
const contract = new web3.eth.Contract(abi, contractAddr);

async function getTransactionCount() {
  return await web3.eth
    .getTransactionCount(addr)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      console.log(error);
      next(error);
    });
}

function getRawTransaction(nonce, data, HashId) {
  console.log(nonce, data, HashId);
  var rawTransaction = {
    from: addr,
    gasPrice: web3.utils.toHex(20 * 1e9),
    gasLimit: web3.utils.toHex(300000),
    to: contractAddr,
    value: "0x0",
    data: contract.methods.newCert(HashId, data).encodeABI(),
    nonce: web3.utils.toHex(nonce),
  };
  return rawTransaction;
}

async function signTransaction(rawTransaction) {
  var transaction = new Tx(rawTransaction, {
    chain: "ropsten",
    hardfork: "petersburg",
  });
  //signing transaction with private key
  await transaction.sign(Buffer.from(pk, "hex"));
  return transaction;
}

async function send(transaction) {
  return await web3.eth
    .sendSignedTransaction("0x" + transaction.serialize().toString("hex"))
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
}

module.exports = {
  getTransactionCount,
  getRawTransaction,
  signTransaction,
  send,
};
