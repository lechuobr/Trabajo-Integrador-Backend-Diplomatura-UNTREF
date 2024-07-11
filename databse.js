process.loadEnvFile()
const mongoose=require('mongoose')
const productoSchema=require('./products.js')

const uri=process.env.URLSTRING
const database=process.env.DATABASE

mongoose.connect(uri + database)
.then(()=>console.log("conectado a mangosta"))
.catch((error)=>console.log(error))

const prendas=mongoose.model('prendas',productoSchema)

module.exports=prendas