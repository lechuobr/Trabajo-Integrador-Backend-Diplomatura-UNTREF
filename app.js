process.loadEnvFile()
const express = require ('express')
const mongoose=require('mongoose')
const app=express()
const port=process.env.PORT
const secretkey=process.env.SECRETKEY
const prendas=require('./databse.js')
const morgan=require ('morgan')
const jwt=require('jsonwebtoken')
const session = require('express-session')
const cookieParser= require ('cookie-parser')
const user=[{
  nombre:"jesus",
  clave:1234,
  id:1

}]

function autorizacion(req,res,next){
  const token=req.cookies.token
  console.log(token)
  if(token){
    jwt.verify(token,secretkey,(error,decoded)=>{
      if(error){
        return res.status(401).json({mensaje:"Debes estar registrado"})
        
      }else{
        req.userid=decoded.id
        next()
      }
    })
  }else{
    res.status(401).json({mensaje:"Debes estar registrado"})
  }
  
}

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(
  session({
    secret: 'nuestra-clave-secreta-larga-con-caracteres-raros',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }
  })
)

app.get('/',(req,res)=>{
    res.send('Bienvenidos a la feria de ropa')
})

app.get('/prendas/all',async(req,res)=>{
    try {
        const prenda=await prendas.find()
        res.status(200).json(prenda)
    } catch (error) {
        res.status(500).json({mensaje:"Error al conectar "})
    }
})

app.get('/prendas/id/:id',async(req,res)=>{
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
  const persona=user.find((p)=>p.nombre==nombre && p.clave==clave)
    if (persona) {
    const token=jwt.sign({id:persona.id},secretkey,{expiresIn:'1h'})
    res.cookie('token', token, { httpOnly: true, secure: false })
    req.session.token = token
    req.session.userid = persona.id
    res.json({ mensaje: 'Registro exitoso' })
  } else {
    res.status(401).json({mensaje:"Usuario invalido"})
    
  }

})

app.get('/prendas/nombre/:nombre',async(req,res)=>{
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
  req.session.destroy((error)=>{
    if(error){
      res.status(500).json({mensaje:"Error al Desconectar"})
    }else{
      res.clearCookie('token')
      res.json({mensaje:"Desconectado"})
    }
  })
})

app.post('/Newprendas',autorizacion,async(req,res)=>{
   const Nuevaprenda= new prendas(req.body)
  const numero=(await prendas.find()).length +1
  const codigo={"codigo":numero}
  const prendafinal= Object.assign(Nuevaprenda,codigo)
 try {
    await prendafinal.save()
   .then((docs)=>res.json({mensaje:"nueva prenda agregada",docs}))
   .catch((eror)=>res.send("Error de validacion"))
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