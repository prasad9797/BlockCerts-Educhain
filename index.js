const express = require("express");
const cors = require("cors");
const config = require("config");
const logger = require("morgan");
const app = express();
const auth = require("./middlewares/auth");
const runner = require("./middlewares/runner");
const error = require("./middlewares/error");
const cron = require("node-cron");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("common"));

app.get("/", (req, res) =>
  res.status(200).json({
    status: 200,
    message: "Health check successful",
  })
);

// cron.schedule("1 * * * * *", runner);

const Auth = require("./routes/api/Auth");
const Protected = require("./routes/api/Protected");
const Public = require("./routes/api/Public");

app.use("/api/v1/auth", Auth);
app.use("/api/v1/protected", Protected);
app.use("/api/v1/public", Public);

app.use(error);

app.listen(5000, () =>
  console.log(`Server is listening at http://localhost:5000`)
);
