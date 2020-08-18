const express = require("express");
const router = express.Router();
const config = require("config");
const pgp = require("../../dbInit/dbConn").pgp;
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
// const EventEmitter = require("events");

// const myEmitter = new EventEmitter();
// const runner = require("../../runner/runner");
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
    var svg = req.body.svg;
    var query = "insert into certs(email,id,jsonstring,svg) values";
    await cert.map((i, index) => {
      var token = crypto.randomBytes(16).toString("hex");
      query =
        query +
        `('${i.data.email}','${token}','${JSON.stringify(i)}','${svg}'),`;
    });
    query = query.substring(0, query.length - 1);
    await pgp.query(query);
    // myEmitter.emit("callRunner");

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
      "select id,svg from certs where email = ${email} and uploaded=true",
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

router.get("/uploadedSVG", (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw {
        statusCode: 400,
        customMessage: "not authorized!",
      };
    }
   var result  = await pgp.query("select svg from svg_templates where uploader = ${uploader}",{uploader:req.user.username})
        res.status(200).json({ 
          message: `found ${result.length} templates`, 
          data: result 
        });
  }catch(err){
    next(err)
  }
});

router.post("/uploadSVG", async (req, res, next) => {
  try {
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
          customMessage: err,
        };
      } else {
        if (req.file == undefined) {
          throw {
            statusCode: 400,
            customMessage: "no file selected!",
          };
        } else {
          // save svg name, uploader name in table
          await pgp.query(`inser into svg_templates(svg,uploader) values(${svg},${uploader})`,{svg:req.body.svg,uploader:req.user.username})
          res.status(200).json({
            status: 200,
            message: "file uploaded successfully",
            filename: req.body.svg,
          });
        }
      }
    });
  } catch (err) {
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

// myEmitter.on("callRunner", () => {
//   runner();
// });

module.exports = router;
