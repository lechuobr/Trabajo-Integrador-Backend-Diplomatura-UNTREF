const express = require ('express')
const prendas=require('../databasse/database.js')
const Router=express.Router()

Router.get('/',async(req,res)=>{
    try {
        const prenda=await prendas.find()
        res.status(200).json(prenda)
    } catch (error) {
        res.status(500).json({mensaje:"Error al conectar "})
    }
})

module.exports=Router