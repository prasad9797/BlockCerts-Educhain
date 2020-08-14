const fs = require("fs");
const express = require("express");
const router = express.Router();
const config = require("config");
const Web3 = require("web3");
const bcrypt = require("bcrypt");
const infuraURL = config.get("infuraEndpoint");
const APIkey = config.get("infuraAPIkey");
const infura = `${infuraURL}/${APIkey}`;
const web3 = new Web3(new Web3.providers.HttpProvider(infura));
// const abi = config.get("abi");
// var data = require("../../temp-storage/sample.svg");
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
const contractAddr = config.get("contractAddr");

var contract = new web3.eth.Contract(abi, contractAddr);

// @route   POST api/v1/public/single/:id
// @desc    get getsingle cert from blockchain
// @access  public
router.get("/single/:id", async (req, res, next) => {
  try {
    var id = req.params.id;
    contract.methods
      .certificates(id)
      .call()
      .then((result) => {
        var data = pgp.query(
          "select svg,transactionhash from certs where id = ${id}"
        );
        console.log(result);
        res
          .status(200)
          .json({
            result: JSON.parse(result),
            svg: data.svg,
            transactionhash: data.transactionhash,
            issuerPk: config.get("pk"),
          });
      })
      .catch((err) => {
        console.log(err);
        next(err);
      });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.get("/test", (req, res, next) => {
  runner();
});

const getTransactionCount = require("../../transaction-utils/certTransactions")
  .getTransactionCount;
const getRawTransaction = require("../../transaction-utils/certTransactions")
  .getRawTransaction;
const signTransaction = require("../../transaction-utils/certTransactions")
  .signTransaction;
const send = require("../../transaction-utils/certTransactions").send;

async function runner() {
  try {
    var result = await pgp.query(
      "select * from certs where uploaded = false limit 100"
    );
    for (var i = 0; i < result.length; i++) {
      var nonce = await getTransactionCount();
      var rawTransaction = await getRawTransaction(nonce, i.jsonstring, i.id);
      var transaction = await signTransaction(rawTransaction);
      var done = await send(transaction);
      await pgp.query(
        "update certs set transacionhash = ${transactionhash},notify=true,uploaded=true where id = ${id}",
        { transactionhash: done.transactionHash, id: result[i].id }
      );
      console.log(done);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}
router.get("/samplesvg/:svg", async (req, res, next) => {
  try {
    var data = await fs.readFileSync(
      `./public/uploads/${req.params.svg}`,
      "utf8"
    );
    res.status(200).json({
      status: 200,
      data: data,
    });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
