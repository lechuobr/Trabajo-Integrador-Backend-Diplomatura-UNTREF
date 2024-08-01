process.loadEnvFile()
const express = require ('express')
const Router=express.Router({mergeParams:true})
const cookieParser= require ('cookie-parser')
const usuario=require('../databasse/user')
const jwt=require('jsonwebtoken')
const secretkey=process.env.SECRETKEY

function autorizacion(req,res,next){
    const token=req.cookies.token
    console.log(token)
    if(token){
      jwt.verify(token,secretkey,(error,decoded)=>{
        if(error) return res.status(400).json({mensaje:"ERRor"})
         req.userid=decoded.id
        next() 
      })
    }else{
      res.status(401).json({mensaje:"SIN autorizacion"})
    }
  }

module.exports=autorizacion