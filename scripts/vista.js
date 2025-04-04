class Vista {
    constructor() {
        this.modal = document.getElementById("myModal");
        this.btn = document.getElementById("openModalBtn");
        this.pagina = 'jugador';

        const botonesNavPrincipal = document.querySelectorAll('.btn_nav_principal');
        const visualizaJugadores = document.getElementById('visualiza-jugadores');
        const visualizaEquipos = document.getElementById('visualiza-equipos');

        // Evento para cambiar entre jugadores y equipos
        botonesNavPrincipal.forEach(boton => {
            boton.addEventListener('click', () => {
                botonesNavPrincipal.forEach(btn => btn.classList.remove('active'));
                boton.classList.add('active');
                const target = boton.dataset.target;
                if (target === 'jugadores') {
                    visualizaJugadores.style.display = 'flex';
                    visualizaEquipos.style.display = 'none';
                    this.pagina = 'jugador';
                } else {
                    visualizaJugadores.style.display = 'none';
                    visualizaEquipos.style.display = 'flex';
                    this.pagina = 'equipo';
                }
            });
        });

        // Evento para abrir modal
        this.btn.addEventListener("click", () => {
            this.abreModalCrador();
            this.modal.style.display = "block";
        });

        // Cerrar al hacer clic fuera
        window.addEventListener("click", (event) => {
            if (event.target == this.modal) {
                this.modal.style.display = "none";
            }
        });
    }

    abreModalCrador() {
        this.modal.innerHTML = '';

        this.modalContent = document.createElement("div");
        this.modalContent.classList.add("modal-content");

        this.span = document.createElement("span");
        this.span.classList.add("close");
        this.span.innerHTML = "&times;";
        this.span.addEventListener("click", () => {
            this.modal.style.display = "none";
        });

        const formulariosContainer = document.createElement("div");

        if (this.pagina === 'jugador') {
            const titulo = document.createElement("h3");
            titulo.textContent = "Introduce un Nuevo Jugador";
            titulo.classList.add("modal_titulo");
            formulariosContainer.appendChild(titulo);
        
            const formularioJugador = document.createElement("div");
            formularioJugador.classList.add("formulario", "modal-formulario");
            formularioJugador.innerHTML = `
                <form>
                    <label for="imp_nombre_jugador_modal">Nombre del Jugador</label>
                    <input type="text" name="impNombre" id="imp_nombre_jugador_modal" placeholder="Nombre">
                    <label for="imp_posicion_jugador_modal">Posición del Jugador</label>
                    <input type="text" name="impPosicion" id="imp_posicion_jugador_modal" placeholder="Posición">
                    <label for="imp_fecha_nacimiento_modal">Fecha Nacimiento</label>
                    <input type="date" name="impFechaNacimiento" id="imp_fecha_nacimiento_modal">
                    <button type="button">Crear Jugador</button>
                </form>
            `;
            formulariosContainer.appendChild(formularioJugador);
        } else {
            const titulo = document.createElement("h3");
            titulo.textContent = "Introduce un Nuevo Equipo";
            titulo.classList.add("modal_titulo");
            formulariosContainer.appendChild(titulo);

            const formularioEquipo = document.createElement("div");
            formularioEquipo.classList.add("formulario", "modal-formulario");
            formularioEquipo.innerHTML = `
                <form>
                    <label for="imp_nombre_equipo_modal">Nombre del Equipo</label>
                    <input type="text" name="impNombreEquipo" id="imp_nombre_equipo_modal">
                    <label for="imp_ciudad_equipo_modal">Ciudad del Equipo</label>
                    <input type="text" name="impCiudadEquipo" id="imp_ciudad_equipo_modal">
                    <label for="imp_nombre_estadio_modal">Nombre del Estadio</label>
                    <input type="text" name="impNombreEstadio" id="imp_nombre_estadio_modal">
                    <button type="button">Crear Equipo</button>
                </form>
            `;
            formulariosContainer.appendChild(formularioEquipo);
        }

        this.modalContent.appendChild(this.span);
        this.modalContent.appendChild(formulariosContainer);
        this.modal.appendChild(this.modalContent);
    }
}
