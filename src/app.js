// Pasos para configurar el proyecto, además de la estructura de carpetas
// 1. npm init -y
// 2. type: module en package.json
// 2. npm install express
// 3. npm install nodemon
// 4. imports
// 5. Levantar el servidor: nodemon ".\src\rutadelGET"

import express from 'express';

const app = express();

const port = 3000;

app.get('/saludo', (req, res) => {
    res.send("¡Hola a todos, pero ahora desde express!");
})

app.get('/bienvenida', (request, response) => {
    response.send('<h1 style="color: blue">¡Bienvenido a mi aplicación express!</h1>')
})

app.get('/usuario', (req, res) => {
    const usuario = { //Inicializó un objeto usuario
        nombre: "Nahuel",
        apellido: "Ramírez",
        edad: 33,
        correo: "example@gmail.com"
    }
    res.json(usuario);
})

app.listen(port, () =>
    console.log(`Listening on port ${port}`)
)