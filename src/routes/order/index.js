const router = require("express").Router();
const controller = require("./controller");
const {
  verifyTokenAndAdmin,
  verify,
  verifyTokenAndCheackId,
} = require("../../midellwares/verify");

//CRAET OREDR
router.post("/", verify, controller.addOrder);

//UPDATE OREDR
router.put("/:id", verifyTokenAndAdmin, controller.updateOrder);

//DELETE
router.delete("/:id", verifyTokenAndAdmin, controller.delete);

//GET OREDR
router.get("/find/:userId", verifyTokenAndCheackId, controller.getOrder);

//GET ALL OREDRS
router.get("/find", verifyTokenAndCheackId, controller.getAllOrder);

// GET EARNING STATS

router.get("/stats/earning", verifyTokenAndAdmin, controller.earningStats);

//GET ORDER STATS
router.get("/stats", verifyTokenAndAdmin, controller.stats);

//GET daaylyEarning
router.get("/stats/dayli", verifyTokenAndAdmin, controller.daylyRevenue);

module.exports = router;
