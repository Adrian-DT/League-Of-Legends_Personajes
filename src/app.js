const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

app.use(require("../src/routes/index.routes"));
app.use(require("../src/routes/insertar.routes"));
app.use(require("../src/routes/actualizar.routes"));
app.use(require("../src/routes/borrar.routes"));
app.use(require("../src/routes/buscador.routes"));
app.use(require("../src/routes/personajes.routes"));
app.use(express.urlencoded({ extended: true })); // Para recibir datos en formularios

//Necesito hacer uso de la carpeta public para poder acceder a las imagenes
app.use(express.static('public'));
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
