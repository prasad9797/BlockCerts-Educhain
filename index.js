const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();
const auth = require("./middlewares/auth");
const runner = require("./runner/runner");
const emailrunner = require("./runner/emailrunner");
const error = require("./middlewares/error");
const cron = require("node-cron");
app.use(express.json({ extended: false, limit: "50mb" }));
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.use(logger("common"));
app.disable("etag");

 app.get("/api", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Health check successful",
    data: null,
  });
});

cron.schedule("24 11 * * *", runner);
cron.schedule("30 17 * * *", emailrunner);

const Auth = require("./routes/api/auth");
const Protected = require("./routes/api/protected");
const Public = require("./routes/api/public");

app.use("/api/v1/auth", Auth);
app.use("/api/v1/protected", auth, Protected);
app.use("/api/v1/public", Public);
app.use("/api/static/media", express.static("public/uploads"));
console.log(__dirname);
app.use(error);

app.listen(8080, () => console.log(`Server is listening`));
