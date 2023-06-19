const express = require("express");
const Router = express.Router();
const {Inventory_item} = require('../Model/InvItemModel');
const Item = require("../Model/ItemModel");


Router.get("/all",async (req,res)=>{
  try {
    const items = await Inventory_item.find();
    console.log(items);
    res.json(items)
  } catch (error) {
    console.log(error)
  }
    // res.json([{"name":"Broccoli","quantity":"100","id":"3"}])
})

Router.post("/new/item",async (req,res)=>{
    console.log(req.body)
    console.log("hit route")
    const {name,quantity,category} = req.body;
    // const found = await Item.findOne({name})
   
    const foundItem = await Item.findOne({name})
    const newInvItem = new Inventory_item({name,quantity,itemInformation:foundItem});
    await newInvItem.save()
    // console.log(foundItem)
  res.json({"meg":"subcess",created:newInvItem})
})

module.exports = Router;