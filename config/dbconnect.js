const mongoose = require("mongoose")
const config = require("config");
const uri = config.get("mongoUri")

async function dbconect() {
     try {
    const connect = await mongoose.connect(uri)
       console.log("db connect")   
     } catch (error) {
         console.log(error.message)
         process.exit(1);
     }
}
module.exports = dbconect;