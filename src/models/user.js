const mongoose = require("mongoose");


const userSchema=new mongoose.Schema({
    name:{type:String ,required:true },
    username:{type:String ,required:true ,uniqe:true},
    img:{type:String },
    lastname:{type:String ,required:true },
    password:{type:String ,required:true},
    email:{type:String},
    isAdmin:{type:Boolean, default:false},
    address:{type:String, required:true},
    phone:{type:String, required:true}

},{timestamps:true});

module.exports=mongoose.model('User',userSchema);

