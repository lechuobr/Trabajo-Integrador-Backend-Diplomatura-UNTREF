process.loadEnvFile()
const express = require ('express')
const Router=express.Router({mergeParams:true})
const cookieParser= require ('cookie-parser')
const usuario=require('../databasse/user')
const jwt=require('jsonwebtoken')
const secretkey=process.env.SECRETKEY

Router.post('/',async(req,res)=>{
  
    const {nombre,clave}=req.body
    try {
      const persona=await usuario.find()
      const valido=persona.find((u)=>u.nombre==nombre && u.clave==clave)
      if(valido){
        const token = jwt.sign(
          { id: valido.id },secretkey,{ expiresIn: '1h' })
          res.cookie('token', token, { httpOnly: true, secure: false })
          res.json({ mensaje: 'Inicio de sesión exitoso' })
      }else{
        res.status(400).json({mensaje:"usuario invalido"})
      }
    } catch (error) {
      res.status(500).json({mensaje:"Server Inestable"})
    }
    
  })

 module.exports=Router