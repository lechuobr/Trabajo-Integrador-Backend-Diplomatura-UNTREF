const express = require ('express')
const Router=express.Router()
Router.get('/',(req,res)=>{
    res.send('Bienvenidos a la feria de ropa')
})

module.exports=Router