const express = require("express");
const router = express.Router();
const config = require("config");
const db = require("../../dbInit/dbConn");
const Web3 = require("web3");

const infuraURL = config.get("infuraEndpoint");
const APIkey = config.get("infuraAPIkey");
const infura = `${infuraURL}/${APIkey}`;
const web3 = new Web3(new Web3.providers.HttpProvider(infura));
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
const contractAddr = config.get("contractAddr");

var contract = new web3.eth.Contract(abi, contractAddr);

// @route   POST api/v1/public/:id
// @desc    get getsingle cert from blockchain
// @access  public
router.get("/single/:id", async (req, res, next) => {
  try {
    var id = req.params.id;
    contract.methods
      .certificates(id)
      .call()
      .then((result) => {
        res.status(200).json({ result: JSON.parse(result) });
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

// @route   POST api/v1/public/:email
// @desc    get all certs for an email account
// @access  public
router.get("/:email", async (req, res, next) => {
  try {
    var email = req.params.email;
    db.query(
      `select hashId from data where email = '${email}'`,
      (err, data) => {
        if (err) {
          throw {
            statusCode: 400,
            customMessage: "Try again later",
          };
        }
        res.status(200).json({
          message: "certifictaes found",
          data: data,
        });
      }
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
