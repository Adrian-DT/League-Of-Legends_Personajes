const controllerIndex = require("../controllers/index.controller");

// Necesito Express
const express = require("express");

// Necesito solo una parte de la funcionalidad de Express: el Router
const router = express.Router();

// Para poder recibir y usar peticiones POST
// Esto es un middleware. Se ejecuta después de la solicitud y antes del envío de la respuesta. Lo que permite es que, si se envía un json, router identifique que se trata de un formato json y va a recoger la información de manera correcta y con el formato que queríamos
router.use(express.json());

// Ruta para atender peticion de cliente
// Parámetros de get() -> request y response. El primero siempre hace referencia a la petición del cliente. Si quiero dar una respuesta al cliente, utilizo el parámetro response.
router.get("/", controllerIndex.index);
router.get("/index", controllerIndex.index);

// Investiga funciones callback


// // Ruta para mostrar los cursos de un lenguaje y un nivel solicitados
// router.get("/api/cursos/programacion/:lenguaje/:nivel", controller.lenguajesProg);
// router.get("/api/cursos/programacion/:lenguaje/", controller.lenguajesProg);

// // Ruta para introducir un curso nuevo. NO ENTIENDO NADA.
// router.post("/api/cursos/programacion", controller.anadirCursoProg);

// // Ruta para actualizar un determinado curso de programación
// router.put("/api/cursos/programacion/:id", controller.actualizarProgramacion);

// // Ruta para actualizar un curso con parametros parciales
// router.patch("/api/cursos/programacion/:id", controller.actualizarCursoPar);

// // Ruta para eliminar un cruso mediante su id
// router.delete("/api/cursos/programacion/:id", controller.eliminarCurso);

// Exportamos la variable router, que me permite crear las rutas
module.exports = router;