const express = require ('express')
const prendas=require('../databasse/database.js')
const mongoose=require('mongoose')
const Router=express.Router({mergeParams:true})

Router.get('/',async(req,res)=>{
  const {id}=req.params
  try {
      const prendaId= await prendas.findById(id)
      .then((docs)=>res.json(docs))
      .catch((error)=>res.status(401).json({mensaje:"ID invalido"}))
    } catch (error) {
      res.status(500).json({mensaje:"Server Inestable"})
  }
})

module.exports=Router