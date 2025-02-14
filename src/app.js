// Pasos para configurar el proyecto, además de la estructura de carpetas
// 1. npm init -y
// 2. type: module en package.json
// 3. npm install express
// 4. npm install nodemon
// 5. npm install multer
// 5 Craer carpeta src
// 6. crear archivo app.js
// 7. imports necesarios
// 8. Levantar el servidor: nodemon ".\src\app.js"

import express from 'express';
import productRouter from "./routes/product.router.js"
import cartRouter from "./routes/cart.router.js"

const app = express();

//Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Inicializar mi servidor
app.listen(8080, () => {
    console.log("El servidor se esta escuchando en el puerto 8080")
})

//Implementamos los routers que creamos
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);