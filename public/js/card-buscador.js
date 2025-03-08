const containerCardNombre = document.querySelector("main");

const inputBuscadorNav = document.querySelector("#inputCriterioNav");

const btnBuscadorNav = document.querySelector(".btnBuscarNombreNav");

const rutaPersonajesCardJSON = "http://localhost:3000/buscador";

const card = document.createElement('div');


const filtroNombreNav = async () => {
    try {
        const response = await fetch(`${rutaPersonajesCardJSON}/${inputBuscadorNav.value}`);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log("Personaje filtrado:", jsonResponse);
            console.log(inputBuscadorNav.value);
            cardBuscadorNav(inputBuscadorNav.value);
        } else {
            alert("No se pudo filtrar el personaje.");
            console.error("Error al filtrar el personaje:", response.status);
        }
    } catch (error) {
        console.log(error);
        // alert("Error inesperado.");
    }
};

// Escuchar cambios en el input
btnBuscadorNav.addEventListener("click", async (e) => {
    e.preventDefault();
    card.innerHTML = "";
    filtroNombreNav();
});


function cardBuscadorNav(filter) {
    fetch("/personajes")
        .then(res => res.json())
        .then(datos => {
            card.classList.add('col', 'mb-5', 'card-Buscador');
            // Mostrar cada personaje encontrado
            datos.forEach(datos => {
                if (filter.toLowerCase() == datos.nombre.toLowerCase()){
                    card.innerHTML = `
                    <div class="col-3 card card-modal h-100 px-2">
                        <button type="button" class="btn-close" onclick="cerrarCard()"><i class="bi bi-x"></i></button>
                        <img class="card-img-top img-fluid mt-2" src="./img/${datos.id}.webp" alt="${datos.nombre}" loading="lazy" />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">${datos.nombre}</h5>
                                <p class="mb-0">${datos.alias}</p>
                                <p class="mb-0 text-muted">Dificultad: ${datos.dificultad}</p>
                                <p class="mb-0 text-muted">Rol: ${datos.rol}</p>
                            </div>
                        </div>
                    </div>
                `;
                }
            });
            containerCardNombre.appendChild(card);
            document.getElementById('overlay').style.display = 'block';
        })
};

function cerrarCard() {
    document.getElementById('overlay').style.display = 'none';
    document.querySelector(".card-modal").style.display = 'none';
}

// Cerrar al hacer clic fuera de la card
document.getElementById('overlay').addEventListener('click', cerrarCard);