const path = require("path");

//Modulo para JSON
const fs = require('fs/promises');
//Ruta del archivo JSON
const rutaPersonajesJSON = path.join(__dirname, "../personajes.json")

// Objeto vacío. Así podemos añadir todas las funciones que queramos
const controller = {};

// Controlador que da acceso a la página actualizar.html
controller.mostrarBuscador = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/buscador.html"));
}

controller.filtrarDificultad = async (req, res) => {
    // Función que me devuelve los cursos de un lenguaje especificado en forma de parámetro de la url
    const dificultad = req.params.dificultad;
    const personajesJSON = await fs.readFile(rutaPersonajesJSON);
    const personajes = JSON.parse(personajesJSON);
    const resultados = personajes.personajes.filter(personaje => personaje.dificultad === dificultad);
    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron personajes con dificultad ${dificultad}.`);
    } else {
        res.send(resultados);
    }
}

controller.filtrarRol = async (req, res) => {
    // Función que me devuelve los cursos de un lenguaje especificado en forma de parámetro de la url
    const rol = req.params.rol;
    const personajesJSON = await fs.readFile(rutaPersonajesJSON);
    const personajes = JSON.parse(personajesJSON);
    const resultados = personajes.personajes.filter(personaje => personaje.rol === rol);
    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron personajes con rol ${rol}.`);
    } else {
        res.send(resultados);
    }
}

controller.filtrarDifRol = async (req, res) => {
    // Función que me devuelve los cursos de un lenguaje especificado en forma de parámetro de la url
    const dificultad = req.params.dificultad;
    const rol = req.params.rol;
    const personajesJSON = await fs.readFile(rutaPersonajesJSON);
    const personajes = JSON.parse(personajesJSON);
    const resultados = personajes.personajes.filter(personaje => personaje.dificultad == dificultad && personaje.rol == rol);
    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron personajes con dificultad ${dificultad} y con rol ${rol}.`);
    } else {
        res.send(resultados);
    }
}

controller.buscarNombre = async (req, res) => {
    // Función que me devuelve los cursos de un lenguaje especificado en forma de parámetro de la url
    const criterio = req.params.criterio;
    const personajesJSON = await fs.readFile(rutaPersonajesJSON);
    const personajes = JSON.parse(personajesJSON);
    // Procesar nombre para comparación
    // Filtrar los personajes según el término de búsqueda
    const resultados = personajes.personajes.filter(personaje =>
        personaje.nombre.toLowerCase().includes(criterio.toLowerCase()));
    if (resultados.length === 0) {
        return res.status(404).send(`No se encontraron personajes con nombre ${nombre}.`);
    } else {
        res.send(resultados);
    }
}

module.exports = controller;