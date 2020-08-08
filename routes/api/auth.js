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

module.exports = router;
