const controllerBuscador = require("../controllers/buscador.controller");

// Necesito Express
const express = require("express");

// Necesito solo una parte de la funcionalidad de Express: el Router
const router = express.Router();

// Para poder recibir y usar peticiones POST
// Esto es un middleware. Se ejecuta después de la solicitud y antes del envío de la respuesta. Lo que permite es que, si se envía un json, router identifique que se trata de un formato json y va a recoger la información de manera correcta y con el formato que queríamos
router.use(express.json());

// Ruta para mostrar la página de buscador
router.get("/buscador", controllerBuscador.mostrarBuscador);

//Ruta para filtrar por dificultad
router.get("/buscador/dificultad/:dificultad", controllerBuscador.filtrarDificultad);

//Ruta para filtrar por rol
router.get("/buscador/rol/:rol", controllerBuscador.filtrarRol);

//Ruta para filtrar por dificultad y rol
router.get("/buscador/:dificultad/:rol", controllerBuscador.filtrarDifRol);

//Ruta para filtrar por dificultad y rol
router.get("/buscador/:criterio", controllerBuscador.buscarNombre);

module.exports = router;
