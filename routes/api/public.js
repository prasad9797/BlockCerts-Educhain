const fs = require("fs");
const pgp = require("../../dbInit/dbConn").pgp;
const express = require("express");
const router = express.Router();
const config = require("config");
const Web3 = require("web3");
const infuraURL = config.get("infuraEndpoint");
const APIkey = config.get("infuraAPIkey");
const infura = `${infuraURL}/${APIkey}`;
const web3 = new Web3(new Web3.providers.HttpProvider(infura));
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
      .then(async (result) => {
        if (!result) {
          throw {
            statusCode: 404,
            customMessage:
              "No such certificate found on the blockchain network",
          };
        }
        var data = await pgp.query(
          "select svg,transactionhash from certs where id = ${id} or cert_id = ${id}",
          { id: id }
        );
        console.log("res", result);
        res.status(200).json({
          result: JSON.parse(result),
          svg: data[0].svg,
          transactionhash: data[0].transactionhash,
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

router.get("/svg/:svg", async (req, res, next) => {
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
