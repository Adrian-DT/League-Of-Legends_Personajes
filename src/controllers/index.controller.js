const path = require("path");

// Objeto vacío. Así podemos añadir todas las funciones que queramos
const controller = {};

controller.index = (req, res) => {
    res.sendFile(path.join(__dirname, "../../public/index.html"));
}

module.exports = controller;