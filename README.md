# API REST

<p>Api  desarrollada con Nodejs-express-mongoose para realizar CRUD en base de datos MongoDB</p>
  
## version
- node v22.2.0
- cookie-parser 1.4.6
-  express  4.19.2
-  mongoose 8.5.0
  


## Run Locally

Clone the project

```bash
  git clone https://github.com/lechuobr/Trabajo-Integrador-Backend-Diplomatura-UNTREF.git
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies
```bash
  npm install
  express
  mongoose
  cookie-parser
  jsonwebtoken
```
Start the server

```bash
  node app.js
```

## API Reference
### Get inicio

|   GET    | http://localhost:3000/|
|----------|------------------------|
<p>Iniciamos nuestro servidor local en el puerto 3000
 </p>

|||
|--|--|
|Status code <span style="color:green">200</span>  |Respuesta 
|
```
 Bienvenido a la ferias de ropa!!
```
|||
|--|--|
|Status code <span style="color:red">400</span>  |Respuesta JSON
|
```
{
  "mensaje": "Error 400"
}
```
 ### Buscar todas las prendas
|   GET    | http://localhost:3000/prendas/all|
|----------|------------------------|
<p> Para obtener todas la Prendas en nuestra base de datos </p>

|||
|--|--|
|Status code <span style="color:green">200</span>  |Respuesta JSON
|

```
{
    "_id": "66741fd7643a5ec565f30659",
    "codigo": 3,
    "nombre": "Camisa Manga Larga",
    "precio": 34.99,
    "categoria": "Camisas"
  },
  {
    "_id": "66741fd7643a5ec565f3065c",
    "codigo": 6,
    "nombre": "Blusa Estampada",
    "precio": 12,
    "categoria": "Outfit"
  },
  ......
```
|||
|--|--|
|Status code <span style="color:red">400</span>  |Respuesta JSON
|
```
{
  "mensaje": "Error 400"
}
```
|||
|--|--|
|Status code <span style="color:yellow">500</span>  |Respuesta JSON
|
```
{
  "mensaje": "Servidor Inestable"
}
```
### Buscar prendas por ID
|   GET    | http://localhost:3000/prendas/id/66741fd7643a5ec565f3065d|
|----------|------------------------|
<p> Buscamos una prenda en nuestra base de datos por ID parametro tipo numerico</p>

|||
|--|--|
|Status code <span style="color:green">200</span>  |Respuesta 
|

```
{
  "_id": "66741fd7643a5ec565f3065d",
  "codigo": 7,
  "nombre": "Camiseta Deportiva",
  "precio": 14.99,
  "categoria": "Outfit"
}
```
|||
|--|--|
|Status code <span style="color:red">401</span>  |Respuesta JSON
|
```
{
  "mensaje": "ID invalido"
}
```
|||
|--|--|
|Status code <span style="color:yellow">500</span>  |Respuesta JSON
|
```
{
  "mensaje": "Servidor Inestable"
}
```

### Get Prendas por nombre 

|   GET    | http://localhost:3000/prendas/nombre/remera|
|----------|------------------------|
 <p> Buscamo una prenda en nuestra base de datos por nombre ,las busquedas pueden ser parciales</p>
 
 |||
|--|--|
|Status code <span style="color:green">200</span>  |Respuesta 
|
 ```
 {
    "_id": "66741fd7643a5ec565f30658",
    "codigo": 2,
    "nombre": "Remera Algodón",
    "precio": 19.99,
    "categoria": "Remeras"
  }
  ```
|||
|--|--|
|Status code <span style="color:red">401</span>  |Respuesta JSON
|
  ```
  {
  "mensaje": "Sin prenda"
}
  ```
  |||
|--|--|
|Status code <span style="color:yellow">500</span>  |Respuesta JSON
|
```
{
  "mensaje": "Servidor Inestable"
}
```
  
  ### Post sumar nueva prenda 
  |   POST   | http://localhost:3000/prendas
|----------|------------------------|
<p>Para sumar una prenda en nuestra base de datos,
en el body ponemos en formato JSON nombre,precios,categoria.

No necesitamos poner ID de eso se encarga Mongoose,y del codigo se encarga Nuestra api</p>

```bash
Content-Type: application/json

{
    "nombre":"Bakend Untref",
    "precio":"5000",
    "categoria":"Remera"
}
```
|||
|--|--|
|Status code <span style="color:green">201</span>  |Respuesta JSON
|
```
{
  "mensaje": "nueva prenda agregada",
  "docs": {
    "nombre": "Bakend Untref",
    "precio": 5000,
    "categoria": "Remera",
    "_id": "6697f45434cfacc0b93f334a",
    "codigo": 33
  }
}
```
|||
|--|--|
|Status code <span style="color:red">401</span>  |Respuesta 
|
```
ERROR DE VALIDACION
```
  |||
|--|--|
|Status code <span style="color:yellow">500</span>  |Respuesta JSON
|
```
{
  "mensaje": "Servidor Inestable"
}
```
### Patch modificar prenda
 |   PATCH   | http://localhost:3000/prendas/Modifict/:id
|----------|------------------------|
<p>Para Actualizar una prenda en nuestra base de datos pasamos como parametro el ID de la prenda a actualizar.

En el body solo ponemos el campo a actualizar en este ejemplo el "Precio"</p>

```bash
Content-Type: application/json

{
   "precio":"12"
}

```
|||
|--|--|
|Status code <span style="color:green">201</span>  |Respuesta JSON
|
```
{
  "mensaje": "Prenda Actualizada",
  "docs": {
    "_id": "66952a6e7d3eef55b2a66689",
    "nombre": "Bakend Untref",
    "precio": 12,
    "categoria": "Remera",
    "codigo": 31
  }
}
```
|||
|--|--|
|Status code <span style="color:red">400</span>  |Respuesta 
|
```
 ID incorrecto
```
  |||
|--|--|
|Status code <span style="color:yellow">500</span>  |Respuesta JSON
|
```
{
  "mensaje": "Servidor Inestable"
}
```
### Delete Prenda
  DELETE   | http://localhost:3000/prendas/id/6697f41a34cfacc0b93f3347
|----------|------------------------|
<p>Para eliminar una prenda de nuestra base de dato buscamos la prenda por ID</p>

|||
|--|--|
|Status code <span style="color:green">200</span>  |Respuesta JSON
|

```
{
  "mensaje": "prenda eliminada",
  "docs": {
    "_id": "6697f41a34cfacc0b93f3347",
    "nombre": "Bakend Untref",
    "precio": 5000,
    "categoria": "Remera",
    "codigo": 32
  }
}
```
|||
|--|--|
|Status code <span style="color:red">400</span>  |Respuesta 
|

```
ID incorrecto
```
  |||
|--|--|
|Status code <span style="color:yellow">500</span>  |Respuesta JSON
|
```
{
  "mensaje": "Servidor Inestable"
}
```
## AUTORIZACION
  ### Post Login
  |   POST   | http://localhost:3000/login
|----------|------------------------|
<p>En nuestra api rest necesitamos estar registrado en nuestra base de datos

En el Body completamos los campos de nombre y clave</p>

```bash
POST  http://localhost:3000/login
Content-Type: application/json

{
    "nombre":"****",
    "clave":****
}
```
|||
|--|--|
|Status code <span style="color:green">200</span>  |Respuesta JSON
|
```

{
  "mensaje": "Inicio de sesión exitoso"
}
```
|||
|--|--|
|Status code <span style="color:red">400</span>  |Respuesta JSON
|
```
{
  "mensaje": "usuario invalido"
}
```
  |||
|--|--|
|Status code <span style="color:yellow">500</span>  |Respuesta JSON
|
```
{
  "mensaje": "Servidor Inestable"
}
```
# Desconexión
 |   GET   | http://localhost:3000/Desconexion
|----------|------------------------|
<p>Desconexio de nuestra api rest</p>

|||
|--|--|
|Status code <span style="color:green">200</span>  |Respuesta JSON
|
```
{
  "mensaje": "Desconectado"
}
```
¨[subir](#api-rest)