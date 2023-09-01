const multer = require("multer");
const upload = require("./upload");
const path=require('path')

module.exports = new (class {
  async userProfile(req, res) {
   res.json({
      message: "userProfile success",
      data: req.file.path.replace(/\\/g, "/").substring(57),
    });
  }
  async productProfile(req, res) {
    res.json({
      message: "productProfile success",
      data: req.file.path.replace(/\\/g, "/").substring(57),
    });
  }
})();
