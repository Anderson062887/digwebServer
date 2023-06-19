const mongoose = require("mongoose")
const Inventory_Item_Schema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
    },

    itemInformation:{
      type:Object,
    }
    ,
    date:{
        type:Date,
        default:Date.now(),
    }
});
const Inventory_item = mongoose.model("inventoryItem", Inventory_Item_Schema);
module.exports = {Inventory_item};

