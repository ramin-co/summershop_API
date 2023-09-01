const router=require('express').Router();
const controller=require('./controller');
// const multer=require('multer');
// const upload=new multer({dest:'/path/to/client/public/images/upload'})
//REGISTER
router.post('/register',controller.register);

//LOGIN
router.post('/login',controller.login);


module.exports=router;