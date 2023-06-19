const express = require("express");
const Router = express.Router();
const User = require("../Model/UserModel");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

Router.post("/login", async(req,res,next)=>{
    const {email,password} = req.body;
    console.log(email)
    try {
        const user = await User.findOne({email}); 
        console.log(user)
        if(user === null){
           return  res.json({message:"this is user was not found",user:false})
        }

        const authUser =  await bcrypt.compare(password,user.password);
        if(authUser === false){
            return  res.json({message:"password is not correct",user:false})    
        }
    
        JWT.sign({user:user.id,},"digsc",{expiresIn: 3600},(err,token)=>{
            if(err) throw new Error({message:"error while signing token"});
            res.json({token, user:true,name:user.name})

        })
     
        
        
    } catch (error) {
        console.log(error)
    }

   
})

Router.post("/register",async (req,res)=>{
const {name,last,password,email} = req.body;
try {
const foundUser = await User.findOne({email})
if(foundUser){
    res.json({message:"this is user already exist",user:false})
}
const salt = await bcrypt.genSalt(10)
const hash = await bcrypt.hash(password,10)

const newUser = await User.create({name,last,password:hash,email});
res.json({message:"you have subcefully created an user",user:true})
} catch (error) {
    console.log(error)
}

})

module.exports = Router;