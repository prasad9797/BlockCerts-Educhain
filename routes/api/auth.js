const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const generateToken = require("../../middlewares/token").generateToken;
const pgp = require("../../dbInit/dbConn").pgp;

router.post("/", async (req, res, next) => {
  try {
    var result = await pgp.query(
      "SELECT * FROM admins WHERE email = ${email} OR phone = ${email}",
      { email: req.body.email }
    );
    if (result.length == 0) {
      throw {
        statusCode: 404,
        customMessage: "User does not exist",
      };
    } else if (!bcrypt.compareSync(req.body.password, result[0].password)) {
      throw {
        statusCode: 401,
        customMessage: "Invalid credentials",
      };
    }
    const token = generateToken(
      {
        username: req.body.username,
        role: "admin",
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

router.post("/login", async (req, res, next) => {
  try {
    var result = await pgp.query(
      "SELECT * FROM users WHERE email = ${email} OR phone = ${email}",
      { email: req.body.email }
    );

    if (result.length == 0) {
      throw {
        statusCode: 404,
        customMessage: "User does not exist",
      };
    } else if (!bcrypt.compareSync(req.body.password, result[0].password)) {
      throw {
        statusCode: 401,
        customMessage: "Invalid credentials",
      };
    }
    const token = generateToken(
      {
        useremail: req.body.email,
        username: result[0].fname + " " + result[0].lname,
      },
      3600
    );
    res.status(200).json({
      message: "Logged in Successfully",
      data: `Bearer ${token}`,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    var result = await pgp.query("select * from users where email = ${email}", {
      email: req.body.email,
    });
    if (result.length !== 0) {
      throw {
        statusCode: 404,
        customMessage: "User with the same email already exists",
      };
    }
    result = await pgp.query(
      "INSERT INTO users (fname, lname, email, phone, password) VALUES (${fname},${lname},${email},${phone},${hash}) returning email",
      {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        phone: req.body.phone,
        hash: hash,
      }
    );
    res.status(200).json({
      message: "Registered Successfully",
      data: result[0].email,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
