const path = require("path");

//Modulo para JSON
const fs = require('fs/promises');
//Ruta del archivo JSON
const rutaPersonajesJSON = path.join(__dirname, "../personajes.json")

// Objeto vacío. Así podemos añadir todas las funciones que queramos
const controller = {};

// Controlador que da acceso a la página actualizar.html
controller.mostrarBorrar = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/borrar.html"));
}

controller.eliminarPersonaje = async (req, res) => {
    const id = req.params.id;

    const personajesJSON = await fs.readFile(rutaPersonajesJSON);
    const personajes = JSON.parse(personajesJSON);

    const indice = personajes.personajes.findIndex(curso => curso.id == id);
    if (indice >= 0) {
        personajes.personajes.splice(indice, 1);
        //writeFile recibe dos parametros obligatoriamente, el primero es la ruta dle fichero JSON y el segundo, lo que vas a escribir en él
        fs.writeFile(rutaPersonajesJSON, JSON.stringify(personajes));
    }
    res.send(personajes);
}

module.exports = controller;