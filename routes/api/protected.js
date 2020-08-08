const express = require("express");
const router = express.Router();
const config = require("config");
const addr = config.get("ethAddress");
const abi = config.get("abi");
const db = require("../../dbInit/dbConn");
const crypto = require("crypto");
const path = require("path");
const csv = require("csvtojson");
var multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: "./temp-storage/",
  filename: function (req, file, cb) {
    cb(null, "tempcsvfile.csv");
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 6000000 },
}).single("csv");

// @route   POST api/v1/addCert
// @desc    add certs to blockchain network
// @access  private
router.post("/addCerts", async (req, res, next) => {
  try {
    // await upload(req, res, (err) => {
    //   if (err) {
    //     console.log(err);
    //     throw {
    //       statusCode: 400,
    //       customMessage: "Try again later",
    //     };
    //   }
    //   console.log("1..");
    //   setTimeout(() => {
    //     console.log("waited");
    //   }, 3000);
    // });
    var cert = req.body.cert; //await csv().fromFile("./temp-storage/tempcsvfile.csv");
    var svg = req.body.svg;
    var query = "insert into data(email,hashId,uploaded,jsonString,svg) values";
    await cert.map((i, index) => {
      var token = crypto.randomBytes(16).toString("hex");
      query =
        query +
        `('${i.email}','${token}',${0},'${JSON.stringify(i)}','${svg}'),`;
      console.log(index);
    });
    query = query.substring(0, query.length - 1);
    await db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        // fs.unlinkSync("./temp-storage/tempcsvfile.csv");
        throw {
          statusCode: 400,
          customMessage: "Try again lateraejhfdc",
        };
      }
      //   console.log(query);
      //   fs.unlinkSync("./temp-storage/tempcsvfile.csv");
      res.status(200).json({
        message: "data will be updated shortly",
      });
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
