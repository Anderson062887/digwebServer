const express = require("express")
const Restaurant = require('../Model/RestaurantModel');

const Router = express.Router();

// const Rest = [{}]

Router.get("/",(req,res,next)=>{
    res.status(200).json([{"orders":"order"}])
})

Router.post("/",(req,res,next)=>{
    console.log(req.body)
    res.status(200).json([{"orders":req.body}])
})

Router.get("/restaurant/list",async(req,res,next)=>{
    try {
        const list = await Restaurant.find()
        res.status(200).json(list)
        
    } catch (error) {
       
        res.status(500).json(error)
    }
 
})

Router.post("/restaurant/create",async(req,res)=>{
    console.log("no error")
     try {
        const {number,address,phone,email} = req.body;
        const newRestaurant = new Restaurant({name:number,address,phone,email})
                              await newRestaurant.save()
        // res.redirect(301,'list');
         res.status(200).json({msg:"subcess"});
     } catch (error) {
         console.log(error.message)
        res.status(501).json(error.message)
     }

})

Router.get("/restaurant/view/:id", async (req,res)=>{
    try {
        const {id} = req.params;
        const restaurantInfo = await Restaurant.findById({_id:id})
       console.log(restaurantInfo)
       res.status(200).json({msg:"subcess",restaurant:restaurantInfo})
        
    } catch (error) {
       
        res.status(404).json({msg:"faile restaurant info not found"})
    }
    
})
module.exports = Router;


