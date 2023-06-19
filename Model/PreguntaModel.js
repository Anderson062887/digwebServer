const mongoose = require("mongoose");
const PregundataSchema = mongoose.Schema({
    pregunta:String,
    respuesta:[]

})

const questions = mongoose.model("question",PregundataSchema)
module.exports = questions;