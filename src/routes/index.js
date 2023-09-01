const router=require('express').Router();
const authRouter=require('./auth/index.js');
const userRouter=require('./user/index.js');
const productRouter=require('./product');
const cartRouter=require('./cart');
const orderRouter=require('./order');
const profileRouter=require('./profile');


router.use('/auth',authRouter);
router.use('/user',userRouter);
router.use('/product',productRouter);
router.use('/cart',cartRouter);
router.use('/order',orderRouter);
router.use('/upload',profileRouter);





module.exports=router;