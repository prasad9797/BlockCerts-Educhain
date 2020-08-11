const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const config = require("config");
const db = require("../../dbInit/dbConn");
const generateToken = require("../../middlewares/token").generateToken;
const jwt = require("jsonwebtoken");
// const config = require("config");
const jwtPrivateKey = config.get("jwtPrivateKey");

router.post("/", async (req, res, next) => {
  try {
    // add joi validation
    if (
      req.body.username !== config.get("defaultUsername") ||
      !bcrypt.compareSync(req.body.password, config.get("defaultPassword"))
    ) {
      throw {
        statusCode: 401,
        customMessage: "Invalid credentials",
      };
    }
    const token = generateToken(
      {
        username: req.body.username,
      },
      600
    );
    res.status(200).json({
      status: 200,
      message: "Logged in succcessfully",
      data: `Bearer ${token}`,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/login", (req, res, next) => {
  try {
    var email = req.body.username;
    var password = req.body.password;
    db.query(
      `SELECT * FROM users WHERE email = '${email}' OR phone = '${email}'`,
      (err, data) => {
        if (err) {
          console.log(err);
          throw {
            statusCode: 400,
            customMessage: "Try again later",
          };
        }
        var pass = JSON.stringify(data[0]);
        if (!bcrypt.compareSync(password, JSON.parse(pass).password)) {
          throw {
            statusCode: 401,
            customMessage: "Invalid credentials",
          };
        }
        const token = generateToken(
          {
            username: req.body.username,
            fname: JSON.parse(pass).fname,
          },
          3600
        );
        res.status(200).json({
          message: "Login Successful",
          data: `Bearer ${token}`,
        });
      }
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    db.query(
      `INSERT INTO users (fname, lname, email, phone, password) VALUES ('${fname}','${lname}','${email}','${phone}','${hash}')`,
      (err, data) => {
        if (err) {
          throw {
            statusCode: 400,
            customMessage: "Try again later",
          };
        }
        res.status(200).json({
          message: "Registered Successfully",
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
