const express = require ('express')
const Router=express.Router()
const cookieParser= require ('cookie-parser')

Router.get('/',(req,res)=>{
    const user=req.cookies.token
    console.log(user)
    if (user) {
      res.clearCookie('token')
      res.send("Desconectado")
      
    } else {
      res.status(400).json({mensaje:"Ya estas desconectado"})
    }
  })

module.exports=Router