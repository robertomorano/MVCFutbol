class Vista {
    constructor(controlador) {
        this.controlador = controlador;
        this.modal = document.getElementById("myModal");
        this.btn = document.getElementById("openModalBtn");
        this.pagina = 'jugador';  

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

        /* Evento para abrir modal */
        this.btn.addEventListener("click", () => {
            this.abreModalCrador();
            this.modal.style.display = "block";
            
            if(this.pagina === 'equipo') {
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

        /* Cerrar al hacer clic fuera */
        window.addEventListener("click", (event) => {
            if (event.target == this.modal) {
                this.modal.style.display = "none";
            }
        });

        this.cerrarModalObjeto();
        this.renderizarVista();
    }

    /*Abre el modal que permite crear un equipo o un jugaodr através de un formulario*/
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
                    if(objeto.getEquipo() === '') {
                        liEquipo.textContent = "Sin Equipo Asignado";
                    } else {
                    liEquipo.textContent = objeto.getEquipo();
                    }
    
                    tarjeta.appendChild(liNombre);
                    tarjeta.appendChild(liPosicion);
                    tarjeta.appendChild(liNacimiento);
                    tarjeta.appendChild(liEquipo);
    
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

    /* Muestra el modal del jugador seleccionado */
    mostrarModalJugador(idJugador) {
        const jugadorSeleccionado = this.controlador.obtenerJugadorPorId(idJugador);
        if (jugadorSeleccionado) {
            const modalJugador = document.getElementById("modalInformacion");
            const imagenJugadorModal = document.getElementById("imagenObjetoModal");
            const nombreJugadorModal = document.getElementById("nombreObjetoModal");
            const posicionJugadorModal = document.getElementById("posicionObjetoModal");
            const fechaNacimientoJugadorModal = document.getElementById("fechaNacimientoObjetoModal");
            const equipoJugadorModal = document.getElementById("equipoObjetoModal");
            const logoEquipoJugadorModal = document.getElementById("imagenSecundariaObjetoModal");
            const ciudadEquipoJugadorModal = document.getElementById("ciudadObjetoModal");
            const estadioEquipoJugadorModal = document.getElementById("estadioObjetoModal");
            const contenedorElementosRelacionados = document.getElementById("contenedor-elementos-relacionados");
    
            imagenJugadorModal.src = jugadorSeleccionado.getImagen();
            nombreJugadorModal.textContent = jugadorSeleccionado.getNombre();
            posicionJugadorModal.textContent = jugadorSeleccionado.getPosicion();
            fechaNacimientoJugadorModal.textContent = jugadorSeleccionado.getFechaNacimiento();
            
    
            const equipoDelJugador = this.controlador.obtenerEquipoPorNombre(jugadorSeleccionado.getEquipo());
            if (equipoDelJugador) {
                equipoJugadorModal.textContent = jugadorSeleccionado.getEquipo();
                logoEquipoJugadorModal.src = equipoDelJugador.getImagen();
                ciudadEquipoJugadorModal.textContent = equipoDelJugador.getCiudad();
                estadioEquipoJugadorModal.textContent = equipoDelJugador.getEstadio();
            } else {
                equipoJugadorModal.textContent = "Sin Equipo Asignado";
                logoEquipoJugadorModal.src = "";
                ciudadEquipoJugadorModal.textContent = "";
                estadioEquipoJugadorModal.textContent = "";
            }
    
            contenedorElementosRelacionados.innerHTML = '';
    
            modalJugador.style.display = "block";
        } else {
            console.log(`No se encontró el jugador con ID: ${idJugador}`);
        }
    }

    /* Muestra el modal del equipo seleccionado */
    mostrarModalEquipo(idEquipo) {
        const equipoSeleccionado = this.controlador.obtenerEquipoPorId(idEquipo);
        if (equipoSeleccionado) {
            const modalEquipo = document.getElementById("modalInformacion");
            const imagenEquipoModal = document.getElementById("imagenObjetoModal");
            const nombreEquipoModal = document.getElementById("nombreObjetoModal");
            const ciudadEquipoModal = document.getElementById("ciudadObjetoModal");
            const estadioEquipoModal = document.getElementById("estadioObjetoModal");
            const contenedorJugadoresEquipoModal = document.getElementById("contenedor-elementos-relacionados");
    
            imagenEquipoModal.src = equipoSeleccionado.getImagen();
            nombreEquipoModal.textContent = equipoSeleccionado.getNombre();
            ciudadEquipoModal.textContent = equipoSeleccionado.getCiudad();
            estadioEquipoModal.textContent = equipoSeleccionado.getEstadio();
    
            document.getElementById("posicionObjetoModal").textContent = "";
            document.getElementById("fechaNacimientoObjetoModal").textContent = "";
            document.getElementById("equipoObjetoModal").textContent = "";
    
            const jugadoresDelEquipo = this.controlador.obtenerJugadoresPorEquipo(equipoSeleccionado.getNombre());
            contenedorJugadoresEquipoModal.innerHTML = '';
    
            if (jugadoresDelEquipo && jugadoresDelEquipo.length > 0) {
                jugadoresDelEquipo.forEach(jugador => {
                    const tarjetaJugador = document.createElement("div");
                    tarjetaJugador.classList.add("tarjeta");
    
                    const imgJugador = document.createElement("img");
                    imgJugador.src = jugador.getImagen();
                    imgJugador.alt = jugador.getNombre();
                    tarjetaJugador.appendChild(imgJugador);
    
                    const nombreJugador = document.createElement("li");
                    nombreJugador.textContent = jugador.getNombre();
                    tarjetaJugador.appendChild(nombreJugador);
    
                    const posicionJugador = document.createElement("li");
                    posicionJugador.textContent = jugador.getPosicion();
                    tarjetaJugador.appendChild(posicionJugador);
    
                    contenedorJugadoresEquipoModal.appendChild(tarjetaJugador);
                });
            } else {
                const mensajeNoJugadores = document.createElement("p");
                mensajeNoJugadores.textContent = "No hay jugadores asignados a este equipo.";
                mensajeNoJugadores.classList.add("mensaje-vacio");
                contenedorJugadoresEquipoModal.appendChild(mensajeNoJugadores);
            }
    
            modalEquipo.style.display = "block";
        } else {
            console.log(`No se encontró el equipo con ID: ${idEquipo}`);
        }
    }

    /* Cierra el modal abierto del equipo o del jugador */
    cerrarModalObjeto() {

        const modalInformacion = document.getElementById("modalInformacion");
        const spanModalInformacion = document.querySelector("#modalInformacion .close");
    
        if (spanModalInformacion) {
            spanModalInformacion.addEventListener('click', () => {
                modalInformacion.style.display = "none";
            });
        }
    
        window.addEventListener('click', (event) => {
            if (event.target === modalInformacion) {
                modalInformacion.style.display = "none";
            }
        });
    }
}
