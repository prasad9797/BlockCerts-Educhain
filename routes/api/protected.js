const express = require("express");
const router = express.Router();
const config = require("config");
const pgp = require("../../dbInit/dbConn").pgp;
const crypto = require("crypto");

// @route   POST api/v1/addCert
// @desc    add certs to blockchain network
// @access  private
router.post("/addCerts", async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw {
        statusCode: 400,
        customMessage: "not authorized!",
      };
    }
    var cert = req.body.cert;
    console.log(req.body);
    var svg = req.body.svg;
    var query = "insert into certs(email,id,jsonstring) values";
    await cert.map((i, index) => {
      var token = crypto.randomBytes(16).toString("hex");
      i.svg = svg;
      query = query + `('${i.email}','${token}','${JSON.stringify(i)}'),`;
    });
    query = query.substring(0, query.length - 1);
    await pgp.query(query);
    res.status(200).json({
      message: "Data will be updated on the blockchain network shortly",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// get certs by user email
router.get("/:email", async (req, res, next) => {
  try {
    var result = await pgp.query(
      "select id,svg from certs where email = ${email}",
      {
        email: req.params.email,
      }
    );
    res.status(200).json({
      message: "certifictaes found",
      data: result,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
