const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const config = require("config");
const generateToken = require("../../middlewares/token").generateToken;

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
    const token = generateToken({
      username: req.body.username,
    });
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
    var email = req.body.email;
    var password = req.body.password;
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    db.query(
      `SELECT * FROM users WHERE email = '${email}' AND password = '${hash}')`,
      (err, data) => {
        if (err) {
          throw {
            statusCode: 400,
            customMessage: "Try again later",
          };
        }
        res.status(200).json({
          message: "Login Successful",
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
