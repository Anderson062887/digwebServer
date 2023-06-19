const express = require("express");
const router = express.Router();
const Item = require("../Model/ItemModel");
const jwt = require("jsonwebtoken");
const User = require("../Model/UserModel");


router.get("/all",async (req,res)=>{
    const list = await Item.find();
    res.json({itemsList:list})
});

router.post("/create",async (req,res)=>{
 
    const {name,category,image,description,pack_size,pack_Type,pack_unit,user} = req.body;
    // console.log(name)
    let userInfo = jwt.decode(user.user)
   
    try {

  const newItem = new Item(
                        {name,
                        category,
                        image:image,
                        description,
                        pack_size:Number(pack_size),
                        pack_Type,
                        pack_unit,
                        createBy:userInfo.user}
                            )
     await newItem.save();
        res.json(newItem)
    } catch (error) {
        console.log(error)
    }
  
});

module.exports = router;