const formulario = document.querySelector("#insertar");

//Ruta del archivo JSON
const rutaPersonajesJSON = "http://localhost:3000/anadir/personaje";

const datosForm = () => {
    // El objeto FormData recibe el formulario del que recibe los datos
    const datos = Object.fromEntries(new FormData(formulario));
    return datos;
}
// const datos = datosForm();
// console.log(datos.nombre);

const datosPost = async () => {
    const nuevoPersonaje = datosForm();

    try {
        const response = await fetch(rutaPersonajesJSON, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoPersonaje)
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            // mostrarCursos(rutaPersonajesJSON);
        }
    } catch (error) {
        console.log(error);
        alert("Error inesperado.");
    }
}

formulario.addEventListener("submit", async (e) => {
    // e.preventDefault();
    let res = datosPost();
    if(res){
        alert("Personaje añadido correctamente.")
    }
});