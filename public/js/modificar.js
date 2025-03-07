const formulario = document.querySelector("#modificar");

//Ruta del archivo JSON
const rutaPersonajesJSON = "http://localhost:3000/modificar";
// const rutaVerPersonajesJSON = path.join(__dirname, "../personajes.json");

const datosForm = () => {
    // El objeto FormData recibe el formulario del que recibe los datos
    const datos = Object.fromEntries(new FormData(formulario));
    return datos;
}

(function mostrarP(){
    fetch("/personajes")
        .then(res => res.json())
        .then(datos => {
            const selectElement = document.getElementById('personajes');
            // Crear opciones dinámicamente
            for (let personaje of datos) {
                const option = document.createElement('option');
                option.value = personaje.id;
                option.textContent = personaje.nombre;
                selectElement.appendChild(option);
            }
        })
    rellenarCampos();
})();

document.getElementById('personajes').addEventListener('change', rellenarCampos);

function rellenarCampos(){
    const selectElement = document.getElementById('personajes');
    console.log('Personaje seleccionado:', this.value);
    fetch("/personajes")
        .then(res => res.json())
        .then(datos => {
            const id = document.getElementById('id');
            const nombre = document.getElementById('nombre');
            const alias = document.getElementById('alias');
            const dificultad = document.getElementById('dificultad');
            const rol = document.getElementById('rol');
            // Crear opciones dinámicamente
            for (let personaje of datos) {
                if (personaje.id == selectElement.value) {
                    id.value = personaje.id;
                    nombre.value = personaje.nombre;
                    alias.value = personaje.alias;
                    dificultad.value = personaje.dificultad;
                    rol.value = personaje.rol;
                }
            }
        })
}

const datosPut = async () => {
    const nuevoPersonaje = datosForm(); // Obtener los datos del formulario
    try {
        const response = await fetch(`${rutaPersonajesJSON}/${personajes.value}`, { // Incluir el ID en la URL
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(nuevoPersonaje) // Enviar los datos actualizados
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log("Personaje actualizado:", jsonResponse);
            // mostrarCursos(rutaPersonajesJSON); // Actualizar la lista si es necesario
        } else {
            console.error("Error al actualizar el personaje:", response.status);
            alert("No se pudo actualizar el personaje.");
        }
    } catch (error) {
        console.log(error);
        // alert("Error inesperado.");
    }
};

formulario.addEventListener("submit", async (e) => {
    // e.preventDefault();
    let res = datosPut();
    if (res) {
        alert("Personaje modificado correctamente.")
    }
});