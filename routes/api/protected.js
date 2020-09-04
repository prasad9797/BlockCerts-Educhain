const express = require("express");
const router = express.Router();
const config = require("config");
const pgp = require("../../dbInit/dbConn").pgp;
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const slugify = require("slugify");

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
    console.log(req.user);
    var cert = req.body.cert; // json
    var svg = req.body.svg; // cert name/id.svg
    var query =
      "insert into certs(uploader,email,id,jsonstring,svg,cert_id) values";
    await cert.map((i, index) => {
      var token = crypto.randomBytes(16).toString("hex");
      query =
        query +
        `('${req.user.username}','${i.data.email}','${token}','${JSON.stringify(
          i
        )}','${svg}','${i.data.cert_id}'),`;
    });
    query = query.substring(0, query.length - 1);
    console.log(query);
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

router.get("/uploadedSVG", async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      throw {
        statusCode: 400,
        customMessage: "not authorized!",
      };
    }
    console.log(req.user.username);
    var result = await pgp.query(
      "select * from svg_templates where uploader = ${uploader}",
      { uploader: req.user.username }
    );
    console.log(result);
    res.status(200).json({
      message: `found ${result.length} templates`,
      data: result,
    });
  } catch (err) {
    next(err);
  }
});
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
          console.log(req.body);
          pgp
            .query(
              "insert into svg_templates(svg_id,svg_slug,uploader) values(${svg_id},${svg_slug},${uploader})",
              {
                svg_id: req.body.name,
                svg_slug: slugify(req.body.slug),
                uploader: req.user.username,
              }
            )
            .then((result) => {
              res.status(200).json({
                status: 200,
                message: "file uploaded successfully",
                slug: slugify(req.body.name),
              });
            })
            .catch((err1) => {
              next(err1);
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
    cb(null, file.originalname);
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
