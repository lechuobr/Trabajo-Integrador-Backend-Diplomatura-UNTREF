const mongoose= require('mongoose')

const user= new mongoose.Schema({
    id:Number,
    nombre:String,
    clave:Number
    
},{ versionKey:false })

const usuario=mongoose.model('usurario',user)

module.exports=usuario