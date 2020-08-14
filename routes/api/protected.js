const express = require("express");
const router = express.Router();
const config = require("config");
const pgp = require("../../dbInit/dbConn").pgp;
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
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
      "select id from certs where email = ${email}",
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

router.post("/uploadSVG", async (req, res, next) => {
  try {
    console.log(req.body);

    if (req.user.role !== "admin") {
      throw {
        statusCode: 400,
        customMessage: "not authorized!",
      };
    }
    upload(req, res, (err) => {
      if (err) {
        throw {
          statusCode: 400,
          customMessage: "an error occured!",
        };
      } else {
        if (req.file == undefined) {
          throw {
            statusCode: 400,
            customMessage: "no file selected!",
          };
        } else {
          res.status(200).json({
            status: 200,
            message: "file uploaded successfully",
            filename: req.body.svg,
          });
        }
      }
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    console.log(req.body);
    cb(null, file.originalname + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
}).single("file");

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /svg/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

module.exports = router;
