const path = require("path");

//Modulo para JSON
const fs = require('fs/promises');
//Ruta del archivo JSON
const rutaPersonajesJSON = path.join(__dirname, "../personajes.json")

// Objeto vacío. Así podemos añadir todas las funciones que queramos
const controller = {};

// Controlador que sirve la página personajes.html
controller.mostrarPersonajes = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/personajes.html"));
}

// Función para obtener el siguiente ID
async function obtenerSiguienteId(datos) {
    //Leeemos el JSON y lo parseamos
    const personajesJSON = await fs.readFile(datos);
    const personajes = JSON.parse(personajesJSON);
    //Comprobamos si no es un array
    if (!Array.isArray(personajes.personajes)) {
        console.error("Los datos no son un array válido.");
        return 1; // Si los datos no son un array, devolvemos 1 como ID inicial.
    }

    if (personajes.personajes.length === 0) {
        return 1; // Si el array está vacío, el primer ID será 1.
    }

    let maxId = 0;

    // Usamos forEach para recorrer todo el array y encontrar el máximo ID
    personajes.personajes.forEach(item => {
        if (typeof item.id === 'number' && item.id > maxId) {
            maxId = item.id;
        }
    });
    return maxId + 1; // Devolver el siguiente ID
}

//Función para comprobar los nombres de los personajes ya introducidos en el JSON
async function comprobarNombres(datos, nombre) {
    //Leeemos el JSON y lo parseamos
    const personajesJSON = await fs.readFile(datos);
    const personajes = JSON.parse(personajesJSON);

    // Usamos forEach para recorrer todo el array y encontrar el máximo ID
    personajes.personajes.forEach(item => {
        if (item.nombre == nombre) {
            return true;
        }
    });
    return false;
}

// Función para añadir un personaje nuevo
controller.anadirPersonaje = async (req, res) => {
    //Capturamos el curso nuevo del formulario
    let personajeNuevo = req.body;
    //Obtenemos el fichero JSON
    const personajesJSON = await fs.readFile(rutaPersonajesJSON);
    //Parseamos el fichero
    const personajes = JSON.parse(personajesJSON);
    //Compruebo el siguiente id del JSON y lo asigno al id del nuevo personaje a añadir
    personajeNuevo.id = await obtenerSiguienteId(rutaPersonajesJSON);
    //Compruebo que el nombre del personaje no exista
    console.log(personajeNuevo.nombre);
    let existe = await comprobarNombres(rutaPersonajesJSON, personajeNuevo.nombre);
    console.log(existe);
    if(existe){
        alert("Existe un personaje con ese nombre en el fichero JSON");
        return;
    }
    //Añadimos el curso nuevo al apartado específico de programación
    personajes.personajes.push(personajeNuevo);
    //writeFile recibe dos parametros obligatoriamente, el primero es la ruta dEL fichero JSON y el segundo, lo que vas a escribir en él
    fs.writeFile(rutaPersonajesJSON, JSON.stringify(personajes));
    res.send(personajes);
}

module.exports = controller;