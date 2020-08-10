const nodemailer = require("nodemailer");
const db = require("../dbInit/dbConn");
const config = require("config");
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.get("SMTPmail"),
    password: config.get("SMTPpassword"),
  },
});
async function emailrunner() {
  var result = [];
  db.query(
    "select * from data where uploaded = 1 and notify = 1 limit 100",
    function (err, res) {
      if (err) {
        console.log(err);
        throw {
          statusCode: 400,
          customMessage: "Try again later",
        };
      } else if (res.length > 0) {
        result = JSON.stringify(res);
      }
    }
  );
  for (var i = 0; i < result.length; i++) {
    var mailOptions = {
      from: config.get("SMTPmail"),
      to: result[i].email,
      subject: "",
      text: "",
    };
    await transport.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log(err);
        throw {
          statusCode: 400,
          customMessage: "Try again later",
        };
      }
      db.query(
        `update data set notify=0 where hashId = '${result[i].jsonString}'`,
        function (err, data) {}
      );
    });
  }
}

module.exports = emailrunner;
