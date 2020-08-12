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
  var result = await db.query(
    "select * from certs where uploaded = 1 and notify = 1 limit 100"
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
        `update data set notify=0 where id = '${result[i].id}'`,
        function (err, data) {}
      );
    });
  }
}

module.exports = emailrunner;
