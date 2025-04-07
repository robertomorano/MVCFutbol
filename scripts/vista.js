class Vista {
    constructor(controlador) {
        this.controlador = controlador;
        this.modal = document.getElementById("myModal");
        this.btn = document.getElementById("openModalBtn");
        this.pagina = 'jugador';

        this.errorCard = document.getElementById('errorCard');
        this.errorMessage = document.getElementById('errorMessage');
        this.cerrarErrorBtn = document.getElementById('cerrarErrorBtn'); // Obtener referencia al botón de cierre

        const botonesNavPrincipal = document.querySelectorAll('.btn_nav_principal');
        const visualizaJugadores = document.getElementById('visualiza-jugadores');
        const visualizaEquipos = document.getElementById('visualiza-equipos');

        /* Evento para cambiar entre jugadores y equipos */
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
                this.renderizarVista();
            });
        });

        /* Evento para abrir modal de creación */
        this.btn.addEventListener("click", () => {
            this.abreModalCrador();
            this.modal.style.display = "block";

            if (this.pagina === 'equipo') {
                this.btnAgregarEquipo = document.getElementById("btn_crea_equipo");
                this.btnAgregarEquipo.addEventListener("click", () => {
                    this.controlador.agregarEquipoDesdeVista();
                });
            } else {
                this.btnAgregarJugador = document.getElementById("btn_crea_jugador");
                this.btnAgregarJugador.addEventListener("click", () => {
                    this.controlador.agregarJugadorDesdeVista();
                });
            }
        });

        /* Cerrar modal de creación al hacer clic fuera */
        window.addEventListener("click", (event) => {
            if (event.target == this.modal) {
                this.modal.style.display = "none";
            }
        });

        this.cerrarModalObjeto();
        this.inicializarErrorCardListeners(); // Inicializar listeners para la tarjeta de error
        this.renderizarVista();
    }

    inicializarErrorCardListeners() {
        if (this.cerrarErrorBtn) {
            this.cerrarErrorBtn.addEventListener('click', () => {
                this.ocultarError();
            });
        }
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
                        <label for="imp_imagen_jugador">Inserta la Imágen del Jugador</label>
                        <input type="file" accept="image/*" name="impImagen" id="imp_imagen_jugador">
                        <label for="imp_nombre_jugador">Nombre del Jugador</label>
                        <input type="text" name="impNombre" id="imp_nombre_jugador" placeholder="Nombre">
                        <label for="imp_posicion_jugador">Posición del Jugador</label>
                        <input type="text" name="impPosicion" id="imp_posicion_jugador" placeholder="Posición">
                        <label for="imp_fecha_nacimiento">Fecha Nacimiento</label>
                        <input type="date" name="impFechaNacimiento" id="imp_fecha_nacimiento">
                        <button type="button" id="btn_crea_jugador">Crear Jugador</button>
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
                        <label for="imp_imagen_equipo">Inserta la Imágen del Equipo</label>
                        <input type="file" accept="image/*" name="impImagen" id="imp_imagen_equipo">
                        <label for="imp_nombre_equipo">Nombre del Equipo</label>
                        <input type="text" name="impNombreEquipo" id="imp_nombre_equipo">
                        <label for="imp_ciudad_equipo">Ciudad del Equipo</label>
                        <input type="text" name="impCiudadEquipo" id="imp_ciudad_equipo">
                        <label for="imp_nombre_estadio">Nombre del Estadio</label>
                        <input type="text" name="impNombreEstadio" id="imp_nombre_estadio">
                        <button type="button" id="btn_crea_equipo">Crear Equipo</button>
                    </form>
                `;
            formulariosContainer.appendChild(formularioEquipo);
        }

        this.modalContent.appendChild(this.span);
        this.modalContent.appendChild(formulariosContainer);
        this.modal.appendChild(this.modalContent);

        if (this.pagina === 'jugador') {
            document.getElementById("btn_crea_jugador").addEventListener("click", () => {
                this.modal.style.display = "none";
                console.log("Jugador creado");
            });
        } else {
            document.getElementById("btn_crea_equipo").addEventListener("click", () => {
                this.modal.style.display = "none";
                console.log("Equipo creado");
            });
        }
    }

    renderizarVista() {
        /* Contenedor según la página activa */
        const contenedor = this.pagina === 'jugador'
            ? document.getElementById("lista_de_jugadores")
            : document.getElementById("lista_de_equipos");

        contenedor.innerHTML = '';

        /* Obtener lista desde el controlador */
        const lista = this.pagina === 'jugador'
            ? this.controlador.obtenerJugadores()
            : this.controlador.obtenerEquipos();

        console.log(lista);

        /* Mostrar mensaje si no hay elementos */
        if (lista.length === 0) {
            const mensaje = document.createElement("p");
            mensaje.classList.add("mensaje-vacio");
            mensaje.textContent = this.pagina === 'jugador'
                ? "No hay jugadores registrados."
                : "No hay equipos registrados.";
            contenedor.appendChild(mensaje);
        } else {
            lista.forEach(objeto => {
                const tarjeta = document.createElement("div");
                tarjeta.classList.add("tarjeta");

                /* Asigno a cada tarjeta el id del objeto para usarlo para mostrar el modal del objeto */
                tarjeta.dataset.id = objeto.getId();

                const img = document.createElement("img");
                img.src = objeto.getImagen();
                tarjeta.appendChild(img);

                if (this.pagina === 'jugador') {
                    const liNombre = document.createElement("li");
                    liNombre.classList.add("jugador");
                    liNombre.textContent = objeto.getNombre();

                    const liPosicion = document.createElement("li");
                    liPosicion.classList.add("posicion");
                    liPosicion.textContent = objeto.getPosicion();

                    const liNacimiento = document.createElement("li");
                    liNacimiento.classList.add("fecha_nacimiento");
                    liNacimiento.textContent = objeto.getFechaNacimiento();

                    const liEquipo = document.createElement("li");
                    liEquipo.classList.add("equipo");

                    if (this.controlador.obtenerEquipoPorId(objeto.getIdEquipo()) === '') {
                        liEquipo.textContent = "Sin Equipo Asignado";
                    } else {
                        liEquipo.textContent = this.controlador.obtenerEquipoPorId(objeto.getIdEquipo());
                    }
                    
                    tarjeta.appendChild(liNombre);
                    tarjeta.appendChild(liPosicion);
                    tarjeta.appendChild(liNacimiento);
                    tarjeta.appendChild(liEquipo);

                    // Agrega el evento de clic para mostrar el modal del jugador
                    tarjeta.addEventListener('click', () => this.mostrarModalJugador(objeto.getId()));

                } else {
                    const liEquipoNombre = document.createElement("li");
                    liEquipoNombre.classList.add("equipo");
                    liEquipoNombre.textContent = objeto.getNombre();

                    const liCiudad = document.createElement("li");
                    liCiudad.classList.add("ciudad");
                    liCiudad.textContent = objeto.getCiudad();

                    const liEstadio = document.createElement("li");
                    liEstadio.classList.add("estadio");
                    liEstadio.textContent = objeto.getEstadio();

                    tarjeta.appendChild(liEquipoNombre);
                    tarjeta.appendChild(liCiudad);
                    tarjeta.appendChild(liEstadio);

                    // Agrega el evento de clic para mostrar el modal del equipo
                    tarjeta.addEventListener('click', () => this.mostrarModalEquipo(objeto.getId()));
                }

                contenedor.appendChild(tarjeta);
            });
        }
    }

    mostrarModalJugador(id) {
        const jugador = this.controlador.obtenerJugadorPorId(id);
        const modal = document.getElementById("modalInformacion");
        const contenedorTarjeta = modal.querySelector(".tarjeta-jugador");
        contenedorTarjeta.innerHTML = ""; // Limpiar todo

        // Imagen del jugador
        const imagenDiv = document.createElement("div");
        imagenDiv.classList.add("imagen-jugador");
        const img = document.createElement("img");
        img.src = jugador.getImagen();
        img.alt = jugador.getNombre();
        imagenDiv.appendChild(img);
        contenedorTarjeta.appendChild(imagenDiv);

        // Info del jugador
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info-jugador");
        const ul = document.createElement("ul");

        const liNombre = document.createElement("li");
        liNombre.innerHTML = `<strong>Nombre:</strong> ${jugador.getNombre()}`;
        ul.appendChild(liNombre);

        const liPos = document.createElement("li");
        liPos.innerHTML = `<strong>Posición:</strong> ${jugador.getPosicion()}`;
        ul.appendChild(liPos);

        const liFecha = document.createElement("li");
        liFecha.innerHTML = `<strong>Fecha de nacimiento:</strong> ${jugador.getFechaNacimiento()}`;
        ul.appendChild(liFecha);

        const nombreEquipo = jugador.getEquipo();
        const equipo = this.controlador.obtenerEquipoPorNombre(nombreEquipo);
        const liEquipo = document.createElement("li");
        liEquipo.innerHTML = `<strong>Equipo:</strong> ${equipo ? equipo.getNombre() : "Sin Equipo Asignado"}`;
        ul.appendChild(liEquipo);

        infoDiv.appendChild(ul);
        contenedorTarjeta.appendChild(infoDiv);

        // Si tiene equipo, mostramos la info del equipo
        if (equipo) {
            const divEquipo = document.createElement("div");
            divEquipo.classList.add("info-equipo-jugador");

            const ulEquipo = document.createElement("ul");

            const liCiudad = document.createElement("li");
            liCiudad.innerHTML = `<strong>Ciudad:</strong> ${equipo.getCiudad()}`;
            ulEquipo.appendChild(liCiudad);

            const liEstadio = document.createElement("li");
            liEstadio.innerHTML = `<strong>Estadio:</strong> ${equipo.getEstadio()}`;
            ulEquipo.appendChild(liEstadio);

            divEquipo.appendChild(ulEquipo);

            const imagenEquipo = document.createElement("div");
            imagenEquipo.classList.add("imagen-equipo-jugador");
            const imgEquipo = document.createElement("img");
            imgEquipo.src = equipo.getImagen();
            imagenEquipo.appendChild(imgEquipo);

            contenedorTarjeta.appendChild(imagenEquipo);
            contenedorTarjeta.appendChild(divEquipo);
        }

        // Botones
        const botones = document.createElement("div");
        botones.classList.add("botones-jugador");
        botones.innerHTML = `
            <button id="btnEliminarJugador">Eliminar</button>
            <button id="btnAsignarEquipo">Asignar equipo</button>
        `;
        contenedorTarjeta.appendChild(botones);

        document.getElementById("btnEliminarJugador").addEventListener("click", () => {
            this.controlador.eliminarJugador(id);
            modal.style.display = "none";
            this.renderizarVista();
        });

        // Mostrar el modal
        modal.style.display = "block";

        // Evento para asignar equipo
        document.getElementById("btnAsignarEquipo").addEventListener("click", () => {
            const equipos = this.controlador.obtenerEquipos();
            if (equipos.length === 0) {
                alert("No hay equipos disponibles.");
                return;
            }

            const nombresEquipos = equipos.map(e => e.getNombre());
            const nombreSeleccionado = prompt("Escribe el nombre del equipo:\n" + nombresEquipos.join("\n"));

            if (nombresEquipos.includes(nombreSeleccionado)) {
                this.controlador.asignarEquipoAJugador(id, nombreSeleccionado);
                modal.style.display = "none";
                this.renderizarVista();
            } else {
                alert("Nombre de equipo inválido.");
            }
        });
    }

    mostrarModalEquipo(id) {
        const equipo = this.controlador.obtenerEquipoPorId(id);
        const modal = document.getElementById("modalInformacion");
        const contenedorTarjeta = modal.querySelector(".tarjeta-jugador");
        contenedorTarjeta.innerHTML = "";

        // Imagen del equipo
        const imagenDiv = document.createElement("div");
        imagenDiv.classList.add("imagen-jugador");
        const img = document.createElement("img");
        img.src = equipo.getImagen();
        img.alt = equipo.getNombre();
        imagenDiv.appendChild(img);
        contenedorTarjeta.appendChild(imagenDiv);

        // Info del equipo
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info-jugador");
        const ul = document.createElement("ul");

        const liNombre = document.createElement("li");
        liNombre.innerHTML = `<strong>Nombre:</strong> ${equipo.getNombre()}`;
        ul.appendChild(liNombre);

        const liCiudad = document.createElement("li");
        liCiudad.innerHTML = `<strong>Ciudad:</strong> ${equipo.getCiudad()}`;
        ul.appendChild(liCiudad);

        const liEstadio = document.createElement("li");
        liEstadio.innerHTML = `<strong>Estadio:</strong> ${equipo.getEstadio()}`;
        ul.appendChild(liEstadio);

        infoDiv.appendChild(ul);
        contenedorTarjeta.appendChild(infoDiv);

        // Lista de jugadores asignados
        const jugadores = this.controlador.obtenerJugadoresPorEquipo(equipo.getNombre());
        const contenedorRelacionados = document.createElement("div");
        contenedorRelacionados.id = "contenedor-elementos-relacionados";
        contenedorRelacionados.classList.add("lista-de-elementos-relacionados");

        if (jugadores.length > 0) {
            jugadores.forEach(jugador => {
                const tarjeta = document.createElement("div");
                tarjeta.classList.add("tarjeta");

                const img = document.createElement("img");
                img.src = jugador.getImagen();
                img.alt = jugador.getNombre();
                tarjeta.appendChild(img);

                const nombre = document.createElement("li");
                nombre.textContent = jugador.getNombre();
                tarjeta.appendChild(nombre);

                const pos = document.createElement("li");
                pos.textContent = jugador.getPosicion();
                tarjeta.appendChild(pos);

                contenedorRelacionados.appendChild(tarjeta);
            });
        } else {
            const mensaje = document.createElement("p");
            mensaje.textContent = "No hay jugadores asignados a este equipo.";
            mensaje.classList.add("mensaje-vacio");
            contenedorRelacionados.appendChild(mensaje);
        }

        contenedorTarjeta.appendChild(contenedorRelacionados);

        modal.style.display = "block";
    }


    cerrarModalObjeto() {
        const modalObjeto = document.getElementById("modalInformacion");
        const spanCerrarJugador = document.querySelector("#modalInformacion .close");

        if (spanCerrarJugador) {
            spanCerrarJugador.addEventListener('click', () => {
                modalObjeto.style.display = "none";
            });
        }

        window.addEventListener('click', (event) => {
            if (event.target === modalObjeto) {
                modalObjeto.style.display = "none";
            }
        });
    }


    mostrarError(mensaje) {
        this.mostrarMensaje('error', mensaje);
    }

    mostrarSuccess(mensaje) {
        this.mostrarMensaje('success', mensaje);
    }

    mostrarMensaje(tipo, mensaje) {
        const card = document.getElementById('errorCard');
        const msg = document.getElementById('errorMessage');

        card.classList.remove('error', 'success');

        card.classList.add(tipo);

        msg.textContent = (tipo === 'error' ? '⚠️ ' : '✅ ') + mensaje;
        card.style.display = 'block';

        // Reinicia animación
        card.style.animation = 'none';
        void card.offsetWidth; // Forzar reflow
        card.style.animation = 'fadeIn 0.4s ease-out forwards';

        clearTimeout(this.errorTimeout);
        this.errorTimeout = setTimeout(() => {
            this.ocultarError();
        }, 5000);
    }

    ocultarError() {
        const card = document.getElementById('errorCard');
        card.style.display = 'none';
    }

}