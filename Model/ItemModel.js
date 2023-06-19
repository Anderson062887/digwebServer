const mongoose = require("mongoose")
const ItemShema = new mongoose.Schema({
    name:{
        required:true,
        unique:true,
        type:String,
    },
    category:String,
    
    image:{
        type:String
    },
    description:{
        type:String,
    },
    pack_size:{
        type:Number,
    },
    pack_Type:{
        type:String,
    },
    pack_unit:{
        type:String,
    },
    createBy:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user"
    }

})
const Item = mongoose.model("Item",ItemShema);
module.exports = Item;