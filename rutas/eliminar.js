const express = require ('express')
const mongoose=require('mongoose')
const prendas=require('../databasse/database.js')
const Router=express.Router({mergeParams:true})

Router.delete('/',async(req,res)=>{
    const {id}=req.params
    try {
     const resultado=await prendas.findByIdAndDelete(id)
    .then((docs)=>res.json({mensaje:"prenda eliminada",docs}))
    .catch((error)=>res.status(400).json({mensaje:"Error de ID"}))
    } catch (error) {
      res.status(500).json({mensaje:"Server Inestable"})
      }
  })

  module.exports=Router