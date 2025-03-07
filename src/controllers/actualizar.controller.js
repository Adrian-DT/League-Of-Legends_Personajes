const path = require("path");

//Modulo para JSON
const fs = require('fs/promises');
//Ruta del archivo JSON
const rutaPersonajesJSON = path.join(__dirname, "../personajes.json")

// Objeto vacío. Así podemos añadir todas las funciones que queramos
const controller = {};

// Controlador que da acceso a la página actualizar.html
controller.mostrarActualizar = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/actualizar.html"));
}

controller.mostrarPersonajesForm = async (req, res) => {
    const personajesJSON = await fs.readFile(rutaPersonajesJSON);
    const personajes = JSON.parse(personajesJSON);

    res.send(personajes);

}

// Controlador para modificar un personaje
controller.modificarPersonaje = async (req, res) => {
    const personajeActualizado = req.body;
    const id = req.params.id;

    const personajesJSON = await fs.readFile(rutaPersonajesJSON);
    const personajes = JSON.parse(personajesJSON);

    const indice = personajes.personajes.findIndex(personaje => personaje.id == id);
    if (indice >= 0) {
        personajes.personajes[indice] = personajeActualizado;
        //writeFile recibe dos parametros obligatoriamente, el primero es la ruta dle fichero JSON y el segundo, lo que vas a escribir en él
        fs.writeFile(rutaPersonajesJSON, JSON.stringify(personajes));
    }
    res.send(personajes[indice]);
}

module.exports = controller;
