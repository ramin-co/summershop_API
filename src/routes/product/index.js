const router = require("express").Router();
const controller = require("./controller");
const { verifyTokenAndAdmin } = require("../../midellwares/verify");

//ADD PRODUCT
router.post("/", verifyTokenAndAdmin, controller.addProduct);

//UPDATE
router.put("/:id", verifyTokenAndAdmin, controller.updateProduct);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, controller.delete);

//GET PRODUCT
router.get("/find/:id", controller.getProduct);

//GET ALL PRODUCT

router.get("/find", controller.getAllPrpduct);

module.exports = router;
