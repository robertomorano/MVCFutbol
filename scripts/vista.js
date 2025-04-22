class Vista {
    constructor(controlador) {
        this.controlador = controlador;
        this.modal = document.getElementById("myModal");
        this.btn = document.getElementById("openModalBtn");
        this.pagina = 'jugador';

        this.errorCard = document.getElementById('errorCard');
        this.errorMessage = document.getElementById('errorMessage');
        this.cerrarErrorBtn = document.getElementById('cerrarErrorBtn');

        this.botonesNavPrincipal = document.querySelectorAll('.btn_nav_principal');
        this.visualizaJugadores = document.getElementById('visualiza-jugadores');
        this.visualizaEquipos = document.getElementById('visualiza-equipos');

        this.listaJugadoresContenedor = document.getElementById('lista_de_jugadores');
        this.listaEquiposContenedor = document.getElementById('lista_de_equipos');

        // Modales separados para jugadores y equipos
        this.modalJugador = document.getElementById("modalInformacionJugador");
        this.modalEquipo = document.getElementById("modalInformacionEquipo");

        // Elementos del desplegable de filtro
        this.botonFiltrar = document.querySelector('.dropdown-toggle');
        this.menuFiltrar = document.querySelector('.dropdown-menu');

        // Vinculamos métodos para asegurar el contexto correcto de 'this'
        this.renderizarVista = this.renderizarVista.bind(this);
    }

    inicializar() {
        // Configurar los botones de navegación principal
        this.botonesNavPrincipal.forEach(boton => {
            boton.addEventListener('click', () => {
                this.botonesNavPrincipal.forEach(btn => btn.classList.remove('active'));
                boton.classList.add('active');
                const target = boton.dataset.target;
                if (target === 'jugadores') {
                    this.visualizaJugadores.style.display = 'flex';
                    this.visualizaEquipos.style.display = 'none';
                    this.pagina = 'jugador';
                    this.actualizarMenuFiltro(['Nombre A-Z', 'Nombre Z-A', 'Posición', 'Edad']); // Filtros para jugadores
                    this.controlador.mostrarJugadores();
                } else {
                    this.visualizaJugadores.style.display = 'none';
                    this.visualizaEquipos.style.display = 'flex';
                    this.pagina = 'equipo';
                    this.actualizarMenuFiltro(['Nombre A-Z', 'Nombre Z-A', 'Ciudad', 'Estadio']); // Filtros para equipos
                    this.controlador.mostrarEquipos();
                }
            });
        });

        // Configurar el botón para abrir el modal
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

        // Configurar el cierre del modal al hacer clic fuera
        window.addEventListener("click", (event) => {
            if (event.target == this.modal) {
                this.modal.style.display = "none";
            }
            if (event.target == this.modalJugador) {
                this.modalJugador.style.display = "none";
            }
            if (event.target == this.modalEquipo) {
                this.modalEquipo.style.display = "none";
            }
        });

        // Inicializar otros componentes
        this.cerrarModalObjeto();
        this.inicializarErrorCardListeners();

        // Inicializar el buscador
        const inputBuscador = document.getElementById('inpBuscador');
        if (inputBuscador) {
            inputBuscador.addEventListener('input', (e) => {
                const termino = e.target.value.trim();
                if (termino.length >= 2) {
                    this.controlador.buscar(termino, this.pagina);
                } else if (this.pagina === 'jugador') {
                    this.controlador.mostrarJugadores();
                } else {
                    this.controlador.mostrarEquipos();
                }
            });
        }

        // Inicializar el desplegable de filtro
        this.inicializarFiltro();

        this.actualizarMenuFiltro(['Nombre A-Z', 'Nombre Z-A', 'Posición', 'Edad']);
    }

    actualizarMenuFiltro(filtros) {
        if (this.menuFiltrar) {
            this.menuFiltrar.innerHTML = '';
            filtros.forEach(filtro => {
                const opcion = document.createElement('a');
                opcion.classList.add('dropdown-item');
                opcion.dataset.filtro = filtro.toLowerCase();
                opcion.textContent = filtro;
                opcion.href = '#'; // Evita el comportamiento de enlace
                opcion.addEventListener('click', (e) => {
                    e.preventDefault();
                    const filtroSeleccionado = e.target.dataset.filtro;
                    if (this.pagina === 'jugador') {
                        this.controlador.filtrarJugadores(filtroSeleccionado);
                    } else if (this.pagina === 'equipo') {
                        this.controlador.filtrarEquipos(filtroSeleccionado);
                    }
                    this.menuFiltrar.classList.remove('show');
                });
                this.menuFiltrar.appendChild(opcion);
            });
        }
    }

    inicializarFiltro() {
        if (this.botonFiltrar && this.menuFiltrar) {
            this.botonFiltrar.addEventListener('click', (e) => {
                e.preventDefault();
                this.menuFiltrar.classList.toggle('show');
            });

            // Cerrar el desplegable si se hace clic fuera
            window.addEventListener('click', (e) => {
                if (!this.botonFiltrar.contains(e.target) && this.menuFiltrar.classList.contains('show')) {
                    this.menuFiltrar.classList.remove('show');
                }
            });
        }
    }

    inicializarErrorCardListeners() {
        if (this.cerrarErrorBtn) {
            this.cerrarErrorBtn.addEventListener('click', () => {
                this.ocultarError();
            });
        }
    }

    limpiarListaJugadores() {
        this.listaJugadoresContenedor.innerHTML = '';
    }

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
        img.alt = jugador.getNombre();
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

    crearTarjetaEquipo(equipo) {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta");
        tarjeta.dataset.id = equipo.getId();

        const img = document.createElement("img");
        img.src = equipo.getImagen();
        img.alt = equipo.getNombre();
        tarjeta.appendChild(img);

        const liEquipoNombre = document.createElement("li");
        liEquipoNombre.classList.add("equipo");
        liEquipoNombre.textContent = equipo.getNombre();
        tarjeta.appendChild(liEquipoNombre);

        const liCiudad = document.createElement("li");
        liCiudad.classList.add("ciudad");
        liCiudad.textContent = equipo.getCiudad();
        tarjeta.appendChild(liCiudad);

        const liEstadio = document.createElement("li");
        liEstadio.classList.add("estadio");
        liEstadio.textContent = equipo.getEstadio();
        tarjeta.appendChild(liEstadio);

        tarjeta.addEventListener('click', () => this.controlador.obtenerParaModalEquipos(tarjeta.dataset.id));
        return tarjeta;
    }

    crearTarjetaJugadorMini(jugador) {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-jugador-mini");
        tarjeta.dataset.id = jugador.getId();

        const img = document.createElement("img");
        img.src = jugador.getImagen();
        img.alt = jugador.getNombre();
        tarjeta.appendChild(img);

        const nombreJugador = document.createElement("div");
        nombreJugador.classList.add("nombre-jugador");
        nombreJugador.textContent = jugador.getNombre();
        tarjeta.appendChild(nombreJugador);

        const posicionJugador = document.createElement("div");
        posicionJugador.classList.add("posicion-jugador");
        posicionJugador.textContent = jugador.getPosicion();
        tarjeta.appendChild(posicionJugador);

        return tarjeta;
    }

    mostrarMensajeVacio(tipo) {
        const contenedor = tipo === 'jugador' ? this.listaJugadoresContenedor : this.listaEquiposContenedor;
        const mensaje = document.createElement("p");
        mensaje.classList.add("mensaje-vacio");
        mensaje.textContent = tipo === 'jugador'
            ? "No hay jugadores que coincidan con el filtro."
            : "No hay equipos que coincidan con el filtro.";
        contenedor.appendChild(mensaje);
    }

    renderizarVista(objeto) {
        const contenedor = this.pagina === 'jugador' ? this.listaJugadoresContenedor : this.listaEquiposContenedor;
        if (!objeto) return;

        if (this.pagina === 'jugador') {
            const tarjetaJugador = this.crearTarjetaJugador(objeto, true);
            contenedor.appendChild(tarjetaJugador);
        } else {
            const tarjetaEquipo = this.crearTarjetaEquipo(objeto);
            contenedor.appendChild(tarjetaEquipo);
        }
    }

    mostrarModalJugador(jugador, suEquipo) {
        const modal = this.modalJugador;
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
            imgEquipo.alt = suEquipo.getNombre();
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
        });

        document.getElementById("btnAsignarEquipo").addEventListener("click", () => {
            const equipos = this.controlador.obtenerEquipos();
            if (equipos.length === 0) {
                this.mostrarError("No hay equipos disponibles.");
                return;
            }

            const nombresEquipos = equipos.map(e => e.getNombre());
            const nombreSeleccionado = prompt("Escribe el nombre del equipo (Copia y pega para evitar confusiones):\n" + nombresEquipos.join("\n"));

            if (nombreSeleccionado && nombresEquipos.includes(nombreSeleccionado)) {
                this.controlador.asignarEquipoAJugador(jugador.getId(), nombreSeleccionado);
                modal.style.display = "none";
                this.mostrarSuccess("Equipo asignado con éxito.");
            } else if (nombreSeleccionado) {
                this.mostrarError("Nombre de equipo inválido.");
            }
        });

        modal.style.display = "block";
    }

    mostrarModalEquipo(equipo, jugadores) {
        const modal = this.modalEquipo;
        const contenedorTarjeta = modal.querySelector(".tarjeta-equipo");
        contenedorTarjeta.innerHTML = "";

        // Sección de información del equipo
        const seccionInfo = document.createElement("div");
        seccionInfo.classList.add("info-equipo-header");
        seccionInfo.style.display = "flex";
        seccionInfo.style.width = "100%";
        seccionInfo.style.marginBottom = "20px";
        seccionInfo.style.justifyContent = "space-between";

        // Bloque de imagen del equipo
        const imagenDiv = document.createElement("div");
        imagenDiv.classList.add("imagen-equipo");
        const img = document.createElement("img");
        img.src = equipo.getImagen();
        img.alt = equipo.getNombre();
        imagenDiv.appendChild(img);
        seccionInfo.appendChild(imagenDiv);

        // Bloque de información del equipo
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info-equipo");
        infoDiv.style.width = "60%";

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
        seccionInfo.appendChild(infoDiv);

        contenedorTarjeta.appendChild(seccionInfo);

        // Sección de jugadores del equipo
        const seccionJugadores = document.createElement("div");
        seccionJugadores.classList.add("jugadores-equipo");

        const tituloJugadores = document.createElement("h3");
        tituloJugadores.textContent = "Jugadores";
        seccionJugadores.appendChild(tituloJugadores);

        const listaJugadores = document.createElement("div");
        listaJugadores.classList.add("lista-jugadores-equipo");

        if (jugadores && jugadores.length > 0) {
            jugadores.forEach(jugador => {
                const tarjetaJugador = this.crearTarjetaJugadorMini(jugador);
                listaJugadores.appendChild(tarjetaJugador);
            });
        } else {
            const mensajeVacio = document.createElement("p");
            mensajeVacio.classList.add("mensaje-vacio");
            mensajeVacio.textContent = "Este equipo no tiene jugadores asignados.";
            listaJugadores.appendChild(mensajeVacio);
        }

        seccionJugadores.appendChild(listaJugadores);
        contenedorTarjeta.appendChild(seccionJugadores);

        // Sección de botones
        const botones = document.createElement("div");
        botones.classList.add("botones-equipo");
        botones.innerHTML = `
            <button id="btnEliminarEquipo">Eliminar equipo</button>
            <button id="btnEditarEquipo">Editar equipo</button>
        `;
        contenedorTarjeta.appendChild(botones);

        document.getElementById("btnEliminarEquipo").addEventListener("click", () => {
            if (jugadores && jugadores.length > 0) {
                this.mostrarError("No se puede eliminar un equipo con jugadores asignados.");
                return;
            }

            if (confirm("¿Está seguro que desea eliminar este equipo?")) {
                this.controlador.eliminarEquipo(equipo.getId());
                modal.style.display = "none";
                this.mostrarSuccess("Equipo eliminado con éxito.");
            }
        });

        // Cuando se le haga click al botón de editar, se abrirá un formulario para editar el equipo
        // y se reemplazará el contenido del modal con el formulario de edición
        document.getElementById("btnEditarEquipo").addEventListener("click", () => {
            const formEdicion = document.createElement("div");
            formEdicion.classList.add("formulario-edicion");
            formEdicion.innerHTML = `
                <form id="form-editar-equipo">
                    <h3>Editar Equipo</h3>
                    <label for="edit-nombre-equipo">Nombre:</label>
                    <input type="text" id="edit-nombre-equipo" value="${equipo.getNombre()}" required>
                    <label for="edit-ciudad-equipo">Ciudad:</label>
                    <input type="text" id="edit-ciudad-equipo" value="${equipo.getCiudad()}" required>
                    <label for="edit-estadio-equipo">Estadio:</label>
                    <input type="text" id="edit-estadio-equipo" value="${equipo.getEstadio()}" required>
                    <div class="botones-formulario">
                        <button type="button" id="btn-cancelar-edicion">Cancelar</button>
                        <button type="button" id="btn-guardar-edicion">Guardar</button>
                    </div>
                </form>
            `;

            // Reemplazar contenido del modal con el formulario
            modal.querySelector(".tarjeta-equipo").innerHTML = "";
            modal.querySelector(".tarjeta-equipo").appendChild(formEdicion);

            // Manejar acciones del formulario
            document.getElementById("btn-cancelar-edicion").addEventListener("click", () => {
                this.mostrarModalEquipo(equipo, jugadores);
            });

            document.getElementById("btn-guardar-edicion").addEventListener("click", () => {
                const nuevoNombre = document.getElementById("edit-nombre-equipo").value;
                const nuevaCiudad = document.getElementById("edit-ciudad-equipo").value;
                const nuevoEstadio = document.getElementById("edit-estadio-equipo").value;

                if (!nuevoNombre || !nuevaCiudad || !nuevoEstadio) {
                    this.mostrarError("Todos los campos son obligatorios.");
                    return;
                }

                const datosActualizados = {
                    id: equipo.getId(),
                    nombre: nuevoNombre,
                    ciudad: nuevaCiudad,
                    estadio: nuevoEstadio
                };

                this.controlador.actualizarEquipo(datosActualizados);
                modal.style.display = "none";
                this.mostrarSuccess("Equipo actualizado con éxito.");
            });
        });

        modal.style.display = "block";
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
        if (this.errorCard) {
            this.errorCard.classList.remove("show");
        }
    }

    cerrarModalObjeto() {
        // Configurar cerrar para el modal de jugador
        const cerrarModalJugador = this.modalJugador.querySelector(".close");
        if (cerrarModalJugador) {
            cerrarModalJugador.addEventListener("click", () => {
                this.modalJugador.style.display = "none";
            });
        }

        // Configurar cerrar para el modal de equipo
        const cerrarModalEquipo = this.modalEquipo.querySelector(".close");
        if (cerrarModalEquipo) {
            cerrarModalEquipo.addEventListener("click", () => {
                this.modalEquipo.style.display = "none";
            });
        }
    }

    // Método para actualizar la vista con nuevos datos después de cambios
    actualizarVista() {
        if (this.pagina === 'jugador') {
            this.controlador.mostrarJugadores();
        } else {
            this.controlador.mostrarEquipos();
        }
    }
}