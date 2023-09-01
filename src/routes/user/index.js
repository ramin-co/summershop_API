const router=require('express').Router();
const controller=require('./controller');
const {verify, verifyTokenAndCheackId,verifyTokenAndAdmin}=require('../../midellwares/verify');

//UPDATE
router.put('/:id',verifyTokenAndCheackId,controller.update);

//DELETE
router.delete('/:id',verifyTokenAndCheackId,controller.delete);

//GET USE
router.get('/find/:id',verifyTokenAndAdmin,controller.getUser);

//GET ALL USERS
router.get('/find',verifyTokenAndAdmin,controller.getAllUsers);

//GET USERS STATE 

router.get('/stats', verifyTokenAndAdmin,controller.stats)


module.exports=router;