const express = require("express");
const router = express.Router();
const config = require("config");
const db = require("../../dbInit/dbConn");
const crypto = require("crypto");

// @route   POST api/v1/addCert
// @desc    add certs to blockchain network
// @access  private
router.post("/addCerts", async (req, res, next) => {
  try {
    var cert = req.body.cert;
    var svg = req.body.svg;
    var query = "insert into data(email,hashId,jsonString) values";
    await cert.map((i, index) => {
      var token = crypto.randomBytes(16).toString("hex");
      i.svg = svg;
      query = query + `('${i.email}','${token}','${JSON.stringify(i)}'),`;
    });
    query = query.substring(0, query.length - 1);
    await db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        throw {
          statusCode: 400,
          customMessage: "Try again later",
        };
      }
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
