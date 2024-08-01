const express = require ('express')
const mongoose=require('mongoose')
const prendas=require('../databasse/database.js')
const Router=express.Router({mergeParams:true})

Router.post('/',async(req,res)=>{
    const Nuevaprenda= new prendas(req.body)
   const numero=(await prendas.find()).length +1
   const codigo={"codigo":numero}
   const prendafinal= Object.assign(Nuevaprenda,codigo)
  try {
     await prendafinal.save()
    .then((docs)=>res.json({mensaje:"nueva prenda agregada",docs}))
    .catch((eror)=>res.status(400)("Error de validacion"))
    } catch (error) {
     res.status(500).json({mensaje:"Server Inestable"})
   }
   
 })

 module.exports=Router