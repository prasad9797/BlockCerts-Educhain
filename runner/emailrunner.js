const nodemailer = require("nodemailer");
const pgp = require("../dbInit/dbConn").pgp;
const config = require("config");
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.get("SMTPmail"),
    pass: config.get("SMTPpassword"),
  },
});
async function emailrunner() {
  try {
    var result = await pgp.query(
      "select * from certs where uploaded = true and notify = true limit 500"
    );

    for (var i = 0; i < result.length; i++) {
      var mailOptions = {
        from: config.get("SMTPmail"),
        to: result[i].email,
        subject: "",
        text: "result[i].id",
        html: `<a href="https://ropsten.etherscan.io/tx/${result[i].transactionhash}><h3>click here to view the transaction</h3></a>`,
      };
      var data = await transport.sendMail(mailOptions);
      await pgp.query("update certs set notify=false where id = ${id}", {
        id: result[i].id,
      });
      console.log(data);
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = emailrunner;
