const router = require("express").Router();
const { userUpload, productUpload } = require("./upload");
// const path = require("path");
const controller = require("./controller");

//store
router.post("/user", userUpload.single("picture"), controller.userProfile);

//store
router.post(
  "/product",
  productUpload.single("picture"),
  controller.productProfile
);

module.exports = router;
