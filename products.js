const mongoose= require('mongoose')

const productoSchema= new mongoose.Schema({
    codigo:Number,
    nombre:{type:String,required:true},
    precio:{type:Number,required:true},
    categoria:{type:String,required:true}
},{ versionKey:false })

module.exports= productoSchema

