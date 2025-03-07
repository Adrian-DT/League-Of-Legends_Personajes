
const rutaPersonajesJSON = "http://localhost:3000/borrar";

(function mostrarP() {
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
})();

const datosDelete = async () => {
    try {
        const response = await fetch(`${rutaPersonajesJSON}/${personajes.value}`, { // Incluir el ID en la URL
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log("Personaje eliminado:", jsonResponse);
            // mostrarCursos(rutaPersonajesJSON); // Actualizar la lista si es necesario
        } else {
            console.error("Error al eliminar el personaje:", response.status);
            alert("No se pudo eliminar el personaje.");
        }
    } catch (error) {
        console.log(error);
        // alert("Error inesperado.");
    }
};

const eliminar = document.getElementById("botonEliminar");

eliminar.addEventListener("click", async (e) => {
    // e.preventDefault();
    let res = datosDelete();
    if (res) {
        alert("Personaje eliminado correctamente.")
        location.reload();
    }
});