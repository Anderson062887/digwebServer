const mongoose = require("mongoose");
const {Schema} = mongoose;
const walk_in_ItemShema = new Schema({
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
})
 const walk_in_Item = mongoose.model("walkinItem", walk_in_ItemShema);
const spaceSchema = new Schema({
   locId:{
       type:String,
       required:true,
       unique:true,
   },
   current:{
    type:Schema.Types.ObjectId,
     ref:"walkinItem"},
   spaceHistory:[{type:Schema.Types.ObjectId,ref:"walkinItem"}]
})
const Space = mongoose.model("spaces",spaceSchema)

module.exports = {Space,walk_in_Item};