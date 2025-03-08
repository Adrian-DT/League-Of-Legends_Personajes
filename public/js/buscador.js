const table = document.querySelector("#personajesTable");

const dificultadForm = document.querySelector("#dificultadForm");
const rolForm = document.querySelector("#rolForm");

const dificultad = document.querySelector("#dificultad");
const rol = document.querySelector("#rol");

const buscarNombre = document.querySelector(".btnBuscarNombre");

const ordNombre = document.querySelector("#ordNombre");
const ordAlias = document.querySelector("#ordAlias");

//Ruta del archivo JSON
const rutaPersonajesJSON = "http://localhost:3000/buscador";
const rutaPersonajesDificultadJSON = "http://localhost:3000/buscador/dificultad";
const rutaPersonajesRolJSON = "http://localhost:3000/buscador/rol";

const filtroDificultad = async () => {
    try {
        const response = await fetch(`${rutaPersonajesDificultadJSON}/${dificultad.value}`);

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log("Personaje filtrado:", jsonResponse);
            console.log(dificultad.value);
            sobreescribirTabla(dificultad.value)
        } else {
            console.error("Error al filtrar el personaje:", response.status);
            alert("No se pudo filtrar el personaje.");
        }
    } catch (error) {
        console.log(error);
        // alert("Error inesperado.");
    }
};

const filtroRol = async () => {
    try {
        const response = await fetch(`${rutaPersonajesRolJSON}/${rol.value}`);

        if (response.ok) {
            const jsonResponse = await response.json();
            console.log("Personaje filtrado:", jsonResponse);
            console.log(rol.value);
            sobreescribirTabla(rol.value)
        } else {
            console.error("Error al filtrar el personaje:", response.status);
            alert("No se pudo filtrar el personaje.");
        }
    } catch (error) {
        console.log(error);
        // alert("Error inesperado.");
    }
};


const filtroDifRol = async () => {
        try {
            const response = await fetch(`${rutaPersonajesJSON}/${dificultad.value}/${rol.value}`);
            // let ruta = `${rutaPersonajesJSON}/${dificultad.value}/${rol.value}`;
            // alert(ruta);
            // alert(JSON.stringify(response));

            if (response.ok) {
                const jsonResponse = await response.json();
                console.log("Personaje filtrado:", jsonResponse);
                sobreescribirTabla2Filter(dificultad.value, rol.value)
            } else {
                console.error(`Error al filtrar el personaje: ${dificultad.value} ${rol.value}`, response.status);
                alert("No se pudo filtrar el personaje.");
            }
        } catch (error) {
            console.log(error);
            // alert("Error inesperado.");
        }
}

function sobreescribirTabla(filter){
    const tbody = document.getElementById('infoTable');
    tbody.innerHTML = "";
    mostrarPFilter(filter);
}

function sobreescribirTabla2Filter(filter, filter2) {
    const tbody = document.getElementById('infoTable');
    tbody.innerHTML = "";
    mostrarP2Filter(filter, filter2);
}

function sobreescribirTablaNombreFilter(filter) {
    const tbody = document.getElementById('infoTable');
    tbody.innerHTML = "";
    mostrarPNombreFilter(filter);
}

dificultad.addEventListener("change", async (e) => {
    // e.preventDefault();
    if(rol.value != "default" && dificultad.value != "default"){
        filtroDifRol();
    } else if (dificultad.value == "default"){
        filtroRol();
    } else {
        filtroDificultad();
    }
});

rol.addEventListener("change", async (e) => {
    // e.preventDefault();
    if (dificultad.value != "default" && rol.value != "default"){
        filtroDifRol();
    } else if (rol.value == "default") {
        filtroDificultad();
    } else {
        filtroRol();
    }
});

function mostrarPFilter(filter){
    fetch("/personajes")
    .then(res => res.json())
    .then(datos => {
        const tbody = document.getElementById('infoTable');
        for (let personaje of datos) {
            const tr = document.createElement('tr');
            const tdId = document.createElement('td');
            const tdNombre = document.createElement('td');
            const tdAlias = document.createElement('td');
            const tdDificultad = document.createElement('td');
            const tdRol = document.createElement('td');
            if (filter == personaje.dificultad || filter == personaje.rol) {
                tdId.textContent = personaje.id;
                tdNombre.textContent = personaje.nombre;
                tdAlias.textContent = personaje.alias;
                tdDificultad.textContent = personaje.dificultad;
                tdRol.textContent = personaje.rol;
            
                tr.appendChild(tdId);
                tr.appendChild(tdNombre);
                tr.appendChild(tdAlias);
                tr.appendChild(tdDificultad);
                tr.appendChild(tdRol);
                tbody.appendChild(tr);
            }
        }
    })
}

function mostrarP2Filter(filter, filter2) {
    fetch("/personajes")
    .then(res => res.json())
    .then(datos => {
        const tbody = document.getElementById('infoTable');
        for (let personaje of datos) {
            const tr = document.createElement('tr');
            const tdId = document.createElement('td');
            const tdNombre = document.createElement('td');
            const tdAlias = document.createElement('td');
            const tdDificultad = document.createElement('td');
            const tdRol = document.createElement('td');
            if (filter == personaje.dificultad && filter2 == personaje.rol) {
                tdId.textContent = personaje.id;
                tdNombre.textContent = personaje.nombre;
                tdAlias.textContent = personaje.alias;
                tdDificultad.textContent = personaje.dificultad;
                tdRol.textContent = personaje.rol;
                tr.appendChild(tdId);
                tr.appendChild(tdNombre);
                tr.appendChild(tdAlias);
                tr.appendChild(tdDificultad);
                tr.appendChild(tdRol);
                tbody.appendChild(tr);
            }
        }
    })
}

function mostrarPNombreFilter(filter){
    fetch("/personajes")
    .then(res => res.json())
    .then(datos => {
        const tbody = document.getElementById('infoTable');
        for (let personaje of datos) {
            const tr = document.createElement('tr');
            const tdId = document.createElement('td');
            const tdNombre = document.createElement('td');
            const tdAlias = document.createElement('td');
            const tdDificultad = document.createElement('td');
            const tdRol = document.createElement('td');
            if (filter.toLowerCase() == personaje.nombre.toLowerCase()) {
                tdId.textContent = personaje.id;
                tdNombre.textContent = personaje.nombre;
                tdAlias.textContent = personaje.alias;
                tdDificultad.textContent = personaje.dificultad;
                tdRol.textContent = personaje.rol;
                tr.appendChild(tdId);
                tr.appendChild(tdNombre);
                tr.appendChild(tdAlias);
                tr.appendChild(tdDificultad);
                tr.appendChild(tdRol);
                tbody.appendChild(tr);
            }
        }
    })
}

ordNombre.addEventListener("click", ordenarNombre);

ordAlias.addEventListener("click", ordenarAlias);

function ordenarNombre(){
    fetch("/personajes")
        .then(res => res.json())
        .then(datos => {
            const tbody = document.getElementById('infoTable');
            tbody.innerHTML = "";
            let ordenado;
            ordenado = datos.sort((a, b) => {
                return a.nombre.localeCompare(b.nombre);
            });
            for (let personaje of ordenado) {
                const tr = document.createElement('tr');
                const tdId = document.createElement('td');
                const tdNombre = document.createElement('td');
                const tdAlias = document.createElement('td');
                const tdDificultad = document.createElement('td');
                const tdRol = document.createElement('td');

                tdId.textContent = personaje.id;
                tdNombre.textContent = personaje.nombre;
                tdAlias.textContent = personaje.alias;
                tdDificultad.textContent = personaje.dificultad;
                tdRol.textContent = personaje.rol;
                tr.appendChild(tdId);
                tr.appendChild(tdNombre);
                tr.appendChild(tdAlias);
                tr.appendChild(tdDificultad);
                tr.appendChild(tdRol);
                tbody.appendChild(tr);
            }
        })
}

function ordenarAlias(){
    fetch("/personajes")
        .then(res => res.json())
        .then(datos => {
            const tbody = document.getElementById('infoTable');
            tbody.innerHTML = "";
            let ordenado;
            ordenado = datos.sort((a, b) => {
                return a.alias.localeCompare(b.alias);
            });
            for (let personaje of ordenado) {
                const tr = document.createElement('tr');
                const tdId = document.createElement('td');
                const tdNombre = document.createElement('td');
                const tdAlias = document.createElement('td');
                const tdDificultad = document.createElement('td');
                const tdRol = document.createElement('td');

                tdId.textContent = personaje.id;
                tdNombre.textContent = personaje.nombre;
                tdAlias.textContent = personaje.alias;
                tdDificultad.textContent = personaje.dificultad;
                tdRol.textContent = personaje.rol;
                tr.appendChild(tdId);
                tr.appendChild(tdNombre);
                tr.appendChild(tdAlias);
                tr.appendChild(tdDificultad);
                tr.appendChild(tdRol);
                tbody.appendChild(tr);
            }
        })
}

// Función autoinvocada para mostrar la info en la tabla con los personajes del JSON
(function mostrarP() {
    fetch("/personajes")
        .then(res => res.json())
        .then(datos => {
            const tbody = document.getElementById('infoTable');
            // Crear tabla dinámicamente
            for (let personaje of datos) {
                const tr = document.createElement('tr');
                const tdId = document.createElement('td');
                const tdNombre = document.createElement('td');
                const tdAlias = document.createElement('td');
                const tdDificultad = document.createElement('td');
                const tdRol = document.createElement('td');

                tdId.textContent = personaje.id;
                tdNombre.textContent = personaje.nombre;
                tdAlias.textContent = personaje.alias;
                tdDificultad.textContent = personaje.dificultad;
                tdRol.textContent = personaje.rol;
                
                tr.appendChild(tdId);
                tr.appendChild(tdNombre);
                tr.appendChild(tdAlias);
                tr.appendChild(tdDificultad);
                tr.appendChild(tdRol);
                tbody.appendChild(tr);
            }
        })
})();

// -------------------------------BUSCADOR POR COINCIDENCIA DE PALABRA------------------------------------------------
const filtroNombre = async () => {
    try {
        const inputCriterio = document.querySelector("#inputCriterio");
        const response = await fetch(`${rutaPersonajesJSON}/${inputCriterio.value}`);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log("Personaje filtrado:", jsonResponse);
            console.log(inputCriterio.value);
            sobreescribirTablaNombreFilter(inputCriterio.value)
        } else {
            console.error("Error al filtrar el personaje:", response.status);
            alert("No se pudo filtrar el personaje.");
        }
    } catch (error) {
        console.log(error);
        // alert("Error inesperado.");
    }
};

// Escuchar cambios en el input
buscarNombre.addEventListener("click", async (e) => {
    e.preventDefault();
    filtroNombre();
});