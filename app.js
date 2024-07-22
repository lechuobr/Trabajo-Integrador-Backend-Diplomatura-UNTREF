process.loadEnvFile()
const express = require ('express')
const mongoose=require('mongoose')
const app=express()
const port=process.env.PORT
const secretkey=process.env.SECRETKEY
const prendas=require('./databse.js')
const morgan=require ('morgan')
const jwt=require('jsonwebtoken')
const cookieParser= require ('cookie-parser')
const usuario=require('./user.js')

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

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.send('Bienvenidos a la feria de ropa')
})

app.get('/prendas/all',autorizacion,async(req,res)=>{
    try {
        const prenda=await prendas.find()
        res.status(200).json(prenda)
    } catch (error) {
        res.status(500).json({mensaje:"Error al conectar "})
    }
})

app.post('/register',async(req,res)=>{
  const {nombre,clave}=req.body
  const nuevouser=new usuario(req.body)
  try {
    await nuevouser.save()
    res.send("Registrado")
  } catch (error) {
    res.status(500).json({mensaje:"error al registrar"})
  }
})

app.get('/prendas/id/:id',autorizacion,async(req,res)=>{
    const {id}=req.params
    try {
        const prendaId= await prendas.findById(id)
        .then((docs)=>res.json(docs))
        .catch((error)=>res.status(401).json({mensaje:"ID invalido"}))
      } catch (error) {
        res.status(500).json({mensaje:"Server Inestable"})
    }
})

app.post('/login',async(req,res)=>{
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
  

app.get('/prendas/nombre/:nombre',autorizacion,async(req,res)=>{
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

app.get('/Desconexion',(req,res)=>{
  const user=req.cookies.token
  console.log(user)
  if (user) {
    res.clearCookie('token')
    res.send("Desconectado")
    
  } else {
    res.status(400).json({mensaje:"Ya estas desconectado"})
  }
})
  

app.post('/Newprendas',autorizacion,async(req,res)=>{
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

app.patch('/prendas/Modifict/:id',autorizacion,async(req,res)=>{
    const {id}=req.params
    try {
        const change= await prendas.findByIdAndUpdate(id,req.body,{new:true},)
        .then((docs)=>res.json({mensaje:"Prenda Actualizada",docs}))
        .catch(()=>res.status(400).send("ID incorrecto"))
    } catch (error) {
        res.status(500).json({mensaje:"Server Inestable"})
    }
})

app.delete('/prendas/id/:id',autorizacion,async(req,res)=>{
  const {id}=req.params
  try {
   const resultado=await prendas.findByIdAndDelete(id)
  .then((docs)=>res.json({mensaje:"prenda eliminada",docs}))
  .catch((error)=>res.status(400).json({mensaje:"Error de ID"}))
  } catch (error) {
    res.status(500).json({mensaje:"Server Inestable"})
    }
})

app.use((req,res)=>{
    res.status(400).json({mensaje:"Error 400"})
})

app.listen(port,()=>{
    console.log("puerto open")
})