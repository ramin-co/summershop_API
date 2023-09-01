const router = require("express").Router();
const controller = require("./controller");
const { verifyTokenAndAdmin, verify, verifyTokenAndCheackId } = require("../../midellwares/verify");


//CREAT CART
router.post("/", verify, controller.addCart);

//UPDATE CART
router.put("/:id", verifyTokenAndCheackId, controller.updateCart);

//DELETE CART
router.delete("/:id", verifyTokenAndCheackId, controller.delete);

//GET CART   we need id for verify user
router.get("/find/:userId",verifyTokenAndCheackId,controller.getCart);

//GET ALL CARTS

router.get("/find", verifyTokenAndAdmin,controller.getAllCart);

module.exports = router;
