class Vista {
    constructor(controlador) {
        this.controlador = controlador;
        this.modal = document.getElementById("myModal");
        this.btn = document.getElementById("openModalBtn");
        this.pagina = 'jugador';

        this.errorCard = document.getElementById('errorCard');
        this.errorMessage = document.getElementById('errorMessage');
        this.cerrarErrorBtn = document.getElementById('cerrarErrorBtn');

        const botonesNavPrincipal = document.querySelectorAll('.btn_nav_principal');
        const visualizaJugadores = document.getElementById('visualiza-jugadores');
        const visualizaEquipos = document.getElementById('visualiza-equipos');

        this.listaJugadoresContenedor = document.getElementById('lista_de_jugadores');
        this.listaEquiposContenedor = document.getElementById('lista_de_equipos');

        botonesNavPrincipal.forEach(boton => {
            boton.addEventListener('click', () => {
                botonesNavPrincipal.forEach(btn => btn.classList.remove('active'));
                boton.classList.add('active');
                const target = boton.dataset.target;
                if (target === 'jugadores') {
                    visualizaJugadores.style.display = 'flex';
                    visualizaEquipos.style.display = 'none';
                    this.pagina = 'jugador';
                    this.controlador.mostrarJugadores();
                } else {
                    visualizaJugadores.style.display = 'none';
                    visualizaEquipos.style.display = 'flex';
                    this.pagina = 'equipo';
                    this.controlador.mostrarEquipos();
                }
            });
        });

        this.btn.addEventListener("click", () => {
            this.abreModalCrador();
            this.modal.style.display = "block";

            const btnCrear = this.modal.querySelector('#btn_crea_jugador') || this.modal.querySelector('#btn_crea_equipo');
            if (btnCrear) {
                btnCrear.addEventListener('click', () => {
                    const datosFormulario = this.obtenerDatosFormularioCreacion();
                    if (this.pagina === 'jugador') {
                        this.controlador.agregarJugadorDesdeVista(datosFormulario);
                    } else {
                        this.controlador.agregarEquipoDesdeVista(datosFormulario);
                    }
                    this.modal.style.display = "none";
                });
            }
        });

        window.addEventListener("click", (event) => {
            if (event.target == this.modal) {
                this.modal.style.display = "none";
            }
        });

        this.cerrarModalObjeto();
        this.inicializarErrorCardListeners();
        this.renderizarVista();
    }

    inicializarErrorCardListeners() {
        if (this.cerrarErrorBtn) {
            this.cerrarErrorBtn.addEventListener('click', () => {
                this.ocultarError();
            });
        }
    }

    // Método para limpiar la lista de jugadores
    limpiarListaJugadores() {
        this.listaJugadoresContenedor.innerHTML = '';
    }

    // Método para limpiar la lista de equipos
    limpiarListaEquipos() {
        this.listaEquiposContenedor.innerHTML = '';
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
                <form id="formulario-crear-jugador">
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
                <form id="formulario-crear-equipo">
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
    }

    obtenerDatosFormularioCreacion() {
        if (this.pagina === 'jugador') {
            const formulario = this.modal.querySelector('#formulario-crear-jugador');
            return {
                imagen: formulario.querySelector('#imp_imagen_jugador').files[0],
                nombre: formulario.querySelector('#imp_nombre_jugador').value,
                posicion: formulario.querySelector('#imp_posicion_jugador').value,
                fechaNacimiento: formulario.querySelector('#imp_fecha_nacimiento').value
            };
        } else {
            const formulario = this.modal.querySelector('#formulario-crear-equipo');
            return {
                imagen: formulario.querySelector('#imp_imagen_equipo').files[0],
                nombre: formulario.querySelector('#imp_nombre_equipo').value,
                ciudad: formulario.querySelector('#imp_ciudad_equipo').value,
                estadio: formulario.querySelector('#imp_nombre_estadio').value
            };
        }
    }

    crearTarjetaJugador(jugador, conEventoClick = true) {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.dataset.id = jugador.getId();

        const img = document.createElement("img");
        img.src = jugador.getImagen();
        tarjeta.appendChild(img);

        const liNombre = document.createElement("li");
        liNombre.classList.add("jugador");
        liNombre.textContent = jugador.getNombre();
        tarjeta.appendChild(liNombre);

        const liPosicion = document.createElement("li");
        liPosicion.classList.add("posicion");
        liPosicion.textContent = jugador.getPosicion();
        tarjeta.appendChild(liPosicion);

        const liNacimiento = document.createElement("li");
        liNacimiento.classList.add("fecha_nacimiento");
        liNacimiento.textContent = jugador.getFechaNacimiento();
        tarjeta.appendChild(liNacimiento);

        const liEquipo = document.createElement("li");
        liEquipo.classList.add("equipo");
        liEquipo.textContent = jugador.getEquipo() === '' ? "Agente Libre" : jugador.getEquipo();
        tarjeta.appendChild(liEquipo);

        if (conEventoClick) {
            tarjeta.addEventListener('click', () => this.controlador.obtenerParaModalJugadores(tarjeta.dataset.id));
        }

        return tarjeta;
    }

    // Se encarga de mostrar un mensaje si la lista de jugadores o equipos está vacía
    mostrarMensajeVacio(tipo) {
        const contenedor = tipo === 'jugador' ? this.listaJugadoresContenedor : this.listaEquiposContenedor;
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-vacio");
        mensaje.textContent = tipo === 'jugador'
            ? "No hay jugadores registrados."
            : "No hay equipos registrados.";
        contenedor.appendChild(mensaje);
    }

    renderizarVista(objeto) {

        const contenedor = this.pagina === 'jugador' ? this.listaJugadoresContenedor : this.listaEquiposContenedor;

        console.log(objeto);

        if (this.pagina === 'jugador') {
            const tarjetaJugador = this.crearTarjetaJugador(objeto);
            contenedor.appendChild(tarjetaJugador);
        } else {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta");
            tarjeta.dataset.id = objeto.getId();

            const img = document.createElement("img");
            img.src = objeto.getImagen();
            tarjeta.appendChild(img);

            const liEquipoNombre = document.createElement("li");
            liEquipoNombre.classList.add("equipo");
            liEquipoNombre.textContent = objeto.getNombre();
            tarjeta.appendChild(liEquipoNombre);

            const liCiudad = document.createElement("li");
            liCiudad.classList.add("ciudad");
            liCiudad.textContent = objeto.getCiudad();
            tarjeta.appendChild(liCiudad);

            const liEstadio = document.createElement("li");
            liEstadio.classList.add("estadio");
            liEstadio.textContent = objeto.getEstadio();
            tarjeta.appendChild(liEstadio);

            tarjeta.addEventListener('click', () => this.controlador.obtenerParaModalEquipos(tarjeta.dataset.id));
            contenedor.appendChild(tarjeta);
        }
    }

    mostrarModalJugador(jugador, suEquipo) {
        const modal = document.getElementById("modalInformacion");
        const contenedorTarjeta = modal.querySelector(".tarjeta-jugador");
        contenedorTarjeta.innerHTML = "";

        const imagenDiv = document.createElement("div");
        imagenDiv.classList.add("imagen-jugador");
        const img = document.createElement("img");
        img.src = jugador.getImagen();
        img.alt = jugador.getNombre();
        imagenDiv.appendChild(img);
        contenedorTarjeta.appendChild(imagenDiv);

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

        const liEquipo = document.createElement("li");
        liEquipo.innerHTML = `<strong>Equipo:</strong> ${suEquipo ? suEquipo.getNombre() : "Agente Libre"}`;
        ul.appendChild(liEquipo);

        infoDiv.appendChild(ul);
        contenedorTarjeta.appendChild(infoDiv);

        if (suEquipo) {
            const divEquipo = document.createElement("div");
            divEquipo.classList.add("info-equipo-jugador");

            const ulEquipo = document.createElement("ul");

            const liCiudad = document.createElement("li");
            liCiudad.innerHTML = `<strong>Ciudad:</strong> ${suEquipo.getCiudad()}`;
            ulEquipo.appendChild(liCiudad);

            const liEstadio = document.createElement("li");
            liEstadio.innerHTML = `<strong>Estadio:</strong> ${suEquipo.getEstadio()}`;
            ulEquipo.appendChild(liEstadio);

            divEquipo.appendChild(ulEquipo);

            const imagenEquipo = document.createElement("div");
            imagenEquipo.classList.add("imagen-equipo-jugador");
            const imgEquipo = document.createElement("img");
            imgEquipo.src = suEquipo.getImagen();
            imagenEquipo.appendChild(imgEquipo);

            contenedorTarjeta.appendChild(imagenEquipo);
            contenedorTarjeta.appendChild(divEquipo);
        }

        const botones = document.createElement("div");
        botones.classList.add("botones-jugador");
        botones.innerHTML = `
            <button id="btnEliminarJugador">Eliminar</button>
            <button id="btnAsignarEquipo">Asignar equipo</button>
        `;
        contenedorTarjeta.appendChild(botones);

        document.getElementById("btnEliminarJugador").addEventListener("click", () => {
            this.controlador.eliminarJugador(jugador.getId());
            modal.style.display = "none";
            this.renderizarVista();
        });

        document.getElementById("btnAsignarEquipo").addEventListener("click", () => {
            const equipos = this.controlador.obtenerEquipos();
            if (equipos.length === 0) {
                this.mostrarError("No hay equipos disponibles.");
                return;
            }

            const nombresEquipos = equipos.map(e => e.getNombre());
            const nombreSeleccionado = prompt("Escribe el nombre del equipo:\n" + nombresEquipos.join("\n"));

            if (nombresEquipos.includes(nombreSeleccionado)) {
                this.controlador.asignarEquipoAJugador(jugador.getId(), nombreSeleccionado);
                modal.style.display = "none";
                this.mostrarSuccess("Equipo asignado con éxito.");
                this.renderizarVista();
            } else {
                this.mostrarError("Nombre de equipo inválido.");
            }
        });

        modal.style.display = "block";
    }

    mostrarModalEquipo(equipo, jugadores) {
        const modal = document.getElementById("modalInformacion");
        const contenedorTarjeta = modal.querySelector(".tarjeta-jugador");
        contenedorTarjeta.innerHTML = "";

        const imagenDiv = document.createElement("div");
        imagenDiv.classList.add("imagen-jugador");
        const img = document.createElement("img");
        img.src = equipo.getImagen();
        img.alt = equipo.getNombre();
        imagenDiv.appendChild(img);
        contenedorTarjeta.appendChild(imagenDiv);

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

        const contenedorRelacionados = document.createElement("div");
        contenedorRelacionados.id = "contenedor-elementos-relacionados";
        contenedorRelacionados.classList.add("lista-de-elementos-relacionados");

        if (jugadores.length > 0) {
            jugadores.forEach(jugador => {
                const tarjetaJugadorModal = this.crearTarjetaJugador(jugador, false);
                contenedorRelacionados.appendChild(tarjetaJugadorModal);
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

        card.style.animation = 'none';
        void card.offsetWidth;
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