const express = require ('express')
const mongoose=require('mongoose')
const prendas=require('../databasse/database.js')
const Router=express.Router({mergeParams:true})

Router.get('/',async(req,res)=>{
    const {nombre}=req.params
    try {
        const prendaName= await prendas.find({nombre:{$regex:nombre,$options:'i'}})
      if (prendaName.length ==0) {
        res.status(400).json({mensaje:"Sin prenda"})
      }else{
        res.json(prendaName)
      }
     } catch (error) {
        res.status(500).json({mensaje:"Server Inestable"})
       }
})

module.exports=Router