// get all certs by email
// get get by hashid
const express = require("express");
const router = express.Router();
const config = require("config");
const db = require("../../dbInit/dbConn");
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
const contractAddr = "0x715925ff36cf50bd3D3e134f207625Dd9EBD0510";
var contract = new web3.eth.Contract(abi, contractAddr);

// @route   POST api/v1/addCert
// @desc    add certs to blockchain network
// @access  private
router.get("/:id", async (req, res, next) => {
  try {
    var id = req.params.id;
    var data = contract.methods
      .certificates(id)
      .call()
      .then((result) => {
        res.status(200).json({ result: JSON.parse(result) });
      });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
