const controllerPersonajes = require("../controllers/personajes.controller");

// Necesito Express
const express = require("express");

// Necesito solo una parte de la funcionalidad de Express: el Router
const router = express.Router();

// Para poder recibir y usar peticiones POST
// Esto es un middleware. Se ejecuta después de la solicitud y antes del envío de la respuesta. Lo que permite es que, si se envía un json, router identifique que se trata de un formato json y va a recoger la información de manera correcta y con el formato que queríamos
router.use(express.json());

// Ruta para mostrar los cursos de programación
router.get("/cards", controllerPersonajes.mostrarPersonajes);

module.exports = router;