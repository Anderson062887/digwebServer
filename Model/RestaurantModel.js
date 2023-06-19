const mongoose = require("mongoose");
const RestaurantShema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
       

    },

    address:{
        type:String,
        required:true,
        
        
    },
   phone:{
        type:String,    
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    OrderHistory:[]
});

const Restaurant = mongoose.model("restaurant",RestaurantShema);
module.exports = Restaurant;