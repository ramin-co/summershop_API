const multer = require("multer");
const { mkdirp } = require("mkdirp");
const path = require("path");

//USER UPLOAD CODE

const userStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    mkdirp(
      path.join(__dirname, "../../../../admin/public/images/upload/profile")
    ).then((made) =>
      cb(
        null,
        path.join(__dirname, "../../../../admin/public/images/upload/profile")
      )
    );
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + path.extname(file.originalname) + ".jpg");
  },
});

const userUpload = multer({ storage: userStorage });

//PRODUCT UPLOAD CODE

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    mkdirp(
      path.join(__dirname, "../../../../admin/public/images/upload/product")
    ).then((made) =>
      cb(
        null,
        path.join(__dirname, "../../../../admin/public/images/upload/product")
      )
    );
  },
  filename: function (req, file, cb) {
    cb(null, path.parse(file.originalname).name + ".jpg");
  },
});

const productUpload = multer({ storage: productStorage });

module.exports = { userUpload, productUpload };
