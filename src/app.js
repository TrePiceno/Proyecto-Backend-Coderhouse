// Pasos para configurar el proyecto
// 1. npm init -y
// 2. type: module en package.json
// 3. npm install express express-handlebars socket.io
// 4. Agregar node_modules y gitignore a gitignore
// 5 Craer carpeta src
// 6. crear archivo app.js
// 7. imports necesarios
// crear carpeta public con carpetas css y js  y sus respectivos index
// Crear carpeta routes y los archivos de producto, cart y views
// Crear carpeta filesystem y sus json y managers
// crear carpeta vistas, dentro layout y partials con sus respectivos archivos
// 8. Levantar el servidor: nodemon ".\src\app.js"

import express from 'express';
import productRouter from "./routes/product.router.js"
import cartRouter from "./routes/cart.router.js"
import viewsRouter from './routes/views.router.js';
import handlebars from "express-handlebars";
import __dirname from './utils.js';
import { Server } from 'socket.io';

const app = express();

//Middleware para analizar el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración Handlebars
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Inicializar mi servidor
const httpServer = app.listen(8080, () => console.log(`Listening on port 8080`));

// Servidor de sockets
const io = new Server(httpServer);

//Implementamos los routers que creamos
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/', viewsRouter);

//Para convertir nuestra carpeta PUBLIC en recursos estáticos
app.use(express.static(__dirname + '/public'));


io.on('connection', socket => {
    
    let productsHandlebars = [
        {
            "id": 1,
            "title": "Laptop Gamer HP OMEN 16",
            "description": "16.1 / Ryzen 9 7940HS / RTX 4070 / 16GB RAM / 512GB SSD / Shadow Black / 7N9X4UA#ABA",
            "code": 963,
            "price": 29999,
            "status": true,
            "stock": 9,
            "category": "Gamer",
            "thumbnials": [
                "https://res.cloudinary.com/dt4230nrl/image/upload/v1726511157/LaptopHpGamer_sujpof.png"
            ]
        },
    ];

    io.emit("productos", productsHandlebars);

    socket.on("nuevoProducto", productoNuevo => {
        productsHandlebars.push({ id: productsHandlebars.length + 1, ...productoNuevo });
        io.emit("productos", productsHandlebars);
    });

    socket.on("eliminarProducto", id => {
        productsHandlebars = productsHandlebars.filter(producto => producto.id !== id);
        io.emit("productos", productsHandlebars);
    });

});