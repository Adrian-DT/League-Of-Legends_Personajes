const container = document.querySelector("#personajes-container");

(function mostrarPersonajesCard(){
    fetch("/personajes")
        .then(res => res.json())
        .then(datos => {
            // Mostrar cada avión encontrado
            datos.forEach(datos => {
                const card = document.createElement('div');
                card.classList.add('col', 'mb-5');
                card.innerHTML = `
                    <div class="card h-100">
                        <img class="card-img-top img-fluid" src="./img/${datos.id}.webp" alt="${datos.nombre}" loading="lazy" />
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
                container.appendChild(card);
            });
        })
})();
