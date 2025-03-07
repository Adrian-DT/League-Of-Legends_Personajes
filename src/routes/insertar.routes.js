const controllerInsertar = require("../controllers/insertar.controller");

// Necesito Express
const express = require("express");
const multer = require('multer');

// Necesito solo una parte de la funcionalidad de Express: el Router
const router = express.Router();

// Para poder recibir y usar peticiones POST
// Esto es un middleware. Se ejecuta después de la solicitud y antes del envío de la respuesta. Lo que permite es que, si se envía un json, router identifique que se trata de un formato json y va a recoger la información de manera correcta y con el formato que queríamos
router.use(express.json());

// Configurar almacenamiento de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Directorio donde se guardarán las imágenes
        cb(null, 'img/');
    },
    filename: (req, file, cb) => {
        // Obtener el nombre del input 'nombre'
        const nombreUsuario = req.body.nombre || 'imagen'; // Valor por defecto si no hay nombre
        const extension = ".webp";
        cb(null, `${nombreUsuario}${extension}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/webp'];
        allowedTypes.includes(file.mimetype) ? cb(null, true) : cb(new Error('Formato no permitido'));
    }
});

// // Crear carpeta 'uploads' si no existe
// if (!fs.existsSync('./uploads')) {
//     fs.mkdirSync('./uploads');
// }

// Ruta para mostrar la página de insertar.html
router.get("/anadir", controllerInsertar.anadir);

// Ruta para mostrar los cursos de programación
router.get("/personajes", controllerInsertar.mostrarPersonajes);

// Ruta para introducir un personaje nuevo.
router.post("/anadir/personaje", upload.single('imagen'), controllerInsertar.anadirPersonaje);

module.exports = router;
