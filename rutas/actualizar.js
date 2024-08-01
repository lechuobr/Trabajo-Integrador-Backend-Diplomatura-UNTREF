const express = require ('express')
const mongoose=require('mongoose')
const prendas=require('../databasse/database.js')
const Router=express.Router({mergeParams:true})

Router.patch('/',async(req,res)=>{
    const {id}=req.params
    try {
        const change= await prendas.findByIdAndUpdate(id,req.body,{new:true},)
        .then((docs)=>res.json({mensaje:"Prenda Actualizada",docs}))
        .catch(()=>res.status(400).send("ID incorrecto"))
    } catch (error) {
        res.status(500).json({mensaje:"Server Inestable"})
    }
})

module.exports=Router