const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    last:{
        type:String,
        required:true,
    },
    email:{
       type:String,
       required:true,
       unique:true
    },
    password:{
       type:String,
    }
});

const User = mongoose.model("user",UserSchema);
module.exports = User;