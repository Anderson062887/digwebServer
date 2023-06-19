const express = require("express");
const router = express.Router(); 
const {walk_in_Item,Space}= require("../Model/palletSpaceModel");


router.get("/",async(req,res)=>{
  console.log(req.body)
    try {
      const locs = await Space.find().populate("current").populate("spaceHistory").exec();
    res.status(200).json({meg:"request received",locations:locs})
    } catch (error) {
      console.log(error)
      res.json({meg:404});
    }
    
  
  })
  router.post("/create", async(req,res)=>{
    const dt = new Date().toString();
  
    try {
      
       const {data} = req.body;
       const {name,quantity,locId,detail} = data;
      
       const space = await Space.findOne({locId}); 
       const item = new walk_in_Item({name,quantity,dt,itemInformation:detail[0]});
         await item.save()
       space.current = item;
        await space.save()
      res.json({meg:"request resibed",items:space});
    } catch (error) {
      console.log(error)
      res.json({meg:404});
    }
  
  })

  router.get("/delete/:loc",async (req,res,next)=>{
    try {
      const {loc} = req.params;
      const space = await Space.findOne({locId:loc}); 
      
      const currentInfo = space.current;
      space.current = null;
       space.spaceHistory.push(currentInfo);
             await space.save();
             res.status(200).json({data:space})
    } catch (error) {
      console.log(error)
    }
  })
  
  router.get("/edit/:loc/:num",async (req,res)=>{
    const {loc,num} = req.params;
  
    try {
      const space = await Space.findOne({locId:loc}); 
      const item = await walk_in_Item.findById(space.current)
      item.quantity = num;
      await item.save();    
      res.status(200).json({mdg:"status 200"})
    } catch (error) {
      
    }
  })

  // router.post("/items/create",(req,res)=>{
  //   console.log(req.body)
  //  res.send("create item")

  // })
  module.exports = router;