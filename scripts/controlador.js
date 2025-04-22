// Clase Controlador que actua como intermediario entre el modelo y la vista
class Controlador {
    constructor() {
        // Inicializamos las referencias a los modelos y la vista
        this.modeloJugadores = null;
        this.modeloEquipos = null;
        this.vista = null;
    }

    // Metodo para asignar el modelo de equipos
    setModeloEquipo(modeloEquipos) {
        this.modeloEquipos = modeloEquipos;
    }

    // Metodo para asignar el modelo de jugadores
    setModeloJugador(modeloJugadores) {
        this.modeloJugadores = modeloJugadores;
    }

    // Metodo para asignar la vista
    setVista(vista) {
        this.vista = vista;
    }

    //Metodo para filtrar los jugadores por nombre, posicion o edad
    filtrarJugadores(filtro) {
        let jugadoresFiltrados = {};

        switch (filtro) {
            case 'nombre a-z':
                jugadoresFiltrados = this.modeloJugadores.getOrdenAlfabetico();
                break;
            case 'nombre z-a':
                jugadoresFiltrados = this.modeloJugadores.getOrdenAlfabeticoDescendente();
                break;
            case 'posición':
                jugadoresFiltrados = this.modeloJugadores.getOrdenPosicion();
                break;
            case 'edad':
                jugadoresFiltrados = this.modeloJugadores.getOrdenFechaNacimiento();
                break;
        }

        this.mostrarJugadoresFiltrados(jugadoresFiltrados);
    }

    // Metodo para filtrar los equipos por nombre, ciudad o estadio
    filtrarEquipos(filtro) {
        let equiposFiltrados = {};
    
        switch (filtro) {
            case 'nombre a-z':
                equiposFiltrados = this.modeloEquipos.getOrdenAlfabetico();
                break;
            case 'nombre z-a':
                equiposFiltrados = this.modeloEquipos.getOrdenAlfabeticoDescendente();                
                break;
            case 'ciudad':
                equiposFiltrados = this.modeloEquipos.getOrdenCiudad();                
                break;
            case 'estadio':
                equiposFiltrados = this.modeloEquipos.getOrdenEstadio();                
                break;
        }
    
        this.mostrarEquiposFiltrados(equiposFiltrados);
    }    

    // Metodo para buscar por termino
    buscar(termino, pagina) {
        console.log(termino, pagina);
        if (pagina === 'jugador') {
            const jugadores = this.modeloJugadores.buscaJugadorPorNombre(termino);

            this.vista.limpiarListaJugadores();
            if (jugadores.length === 0) {
                this.vista.mostrarMensajeVacio('jugador');
                return;
            }
            jugadores.forEach((jugador) => {
                this.vista.renderizarVista(jugador);
            });
        } else {
            const equipos = this.modeloEquipos.buscaEquipoPorNombre(termino);

            this.vista.limpiarListaEquipos();
            if (equipos.length === 0) {
                this.vista.mostrarMensajeVacio('equipo');
                return;
            }
            equipos.forEach((equipo) => {
                this.vista.renderizarVista(equipo);
            });
        }
    }

    // Metodo para mostrar los jugadores en la vista
    mostrarJugadoresFiltrados(jugadoresFiltrados) {

        this.vista.limpiarListaJugadores();
        if (jugadoresFiltrados.length !== 0) {
            jugadoresFiltrados.forEach((jugador) => {
                this.vista.renderizarVista(jugador);
            });
        } else {
            this.vista.mostrarMensajeVacio('jugador');
        }
    }

    // Metodo para mostrar los jugadores en la vista
    mostrarEquiposFiltrados(equiposFiltrados) {

        this.vista.limpiarListaEquipos();
        if (equiposFiltrados.length !== 0) {
            equiposFiltrados.forEach((equipo) => {
                this.vista.renderizarVista(equipo);
            });
        } else {
            this.vista.mostrarMensajeVacio('equipo');
        }
    }

    // Metodo para mostrar los jugadores en la vista
    mostrarJugadores() {
        const jugadores = this.modeloJugadores.getJugadores();
        this.vista.limpiarListaJugadores();
        if (jugadores.length !== 0) {
            jugadores.forEach((jugador) => {
                this.vista.renderizarVista(jugador);
            });
        } else {
            this.vista.mostrarMensajeVacio('jugador');
        }
    }

    // Metodo para mostrar los equipos en la vista
    mostrarEquipos() {
        const equipo = this.modeloEquipos.getEquipos();
        this.vista.limpiarListaEquipos();
        if (equipo.length !== 0) {
        for (let i = 0; i < equipo.length; i++) {
            this.vista.renderizarVista(equipo[i]);
        }
        } else {
            this.vista.mostrarMensajeVacio('equipo');
        }
    }

    // Metodo para obtener la lista de jugadores desde el modelo
    obtenerJugadores() {
        return this.modeloJugadores.getJugadores();
    }
    
    // Metodo para obtener la lista de equipos desde el modelo
    obtenerEquipos() {
        return this.modeloEquipos.getEquipos();
    }    

    // Metodo para obtener un jugador especifico por su ID
    obtenerJugadorPorId(id) {
        return this.modeloJugadores.getJugadorPorId(id);
    }

    obtenerEquipoPorId(id) {
        if (id == -1) {
            return "Asigna Jugador";
        }
        console.log("Intentando obtener equipo con ID:", id);
        const equipo = this.modeloEquipos.getEquipoPorId(id);
        console.log("Equipo encontrado:", equipo);
        return equipo.getNombre();
    }

    // Metodo para obtener un equipo especifico por su ID y mostrarlo en un modal
    obtenerParaModalEquipos(id) {
        console.log("Intentando abrir modal para equipo con ID:", id);
        const equipo = this.modeloEquipos.getEquipoPorId(id);
        console.log("Equipo encontrado:", equipo);
        
        if (equipo !== null) {
            console.log("ID del equipo (para buscar jugadores):", equipo.getId());
            const jugadores = this.modeloJugadores.getJugadoresDeEquipo(equipo.getId());
            console.log("Jugadores encontrados:", jugadores);
            
            console.log("Llamando a mostrarModalEquipo");
            this.vista.mostrarModalEquipo(equipo, jugadores);
            console.log("Después de llamar a mostrarModalEquipo");
        } else {
            console.log("No se encontró el equipo");
        }
    }

    // Metodo para obtener un jugador especifico por su ID y mostrarlo en un modal
    obtenerParaModalJugadores(id) {
        const jugador = this.modeloJugadores.getJugadorPorId(id);
        const equipo = this.modeloEquipos.getEquipoPorId(jugador.getIdEquipo());
        this.vista.mostrarModalJugador(jugador, equipo);
    }

    // Metodo para crear una tarjeta de equipo en la vista
    crearTarjetaJugador(jugador) {
        const equipo = this.modeloEquipos.getEquipoPorId(jugador.idEquipo);
        this.vista.crearTarjetaJugador(jugador, equipo);
    }

    // Metodo para buscar un equipo por su nombre
    obtenerEquipoPorNombre(nombre) {
        return this.modeloEquipos.getEquipoPorNombre(nombre);
    }

    // Metodo para obtener los jugadores que pertenecen a un equipo especifico
    obtenerJugadoresPorEquipo(nombreEquipo) {
        const equipo = this.modeloEquipos.getEquipoPorNombre(nombreEquipo);
        if (!equipo) {
            this.vista.mostrarError("Equipo no encontrado.");
            return;
        }
        this.vista.mostrarSuccess("Se obtuvieron los jugadores.");
        return this.modeloJugadores.getJugadoresDeEquipo(equipo.id);
    }

    // Metodo para asignar un equipo a un jugador
    asignarEquipoAJugador(idJugador, nombreEquipo) {
        const equipo = this.modeloEquipos.getEquipoPorNombre(nombreEquipo);
        if (!equipo) {
            this.vista.mostrarError("Equipo o Jugador no encontrado.");
            return;
        }
        this.vista.mostrarSuccess("Se asigno el equipo al jugador con exito.");
        this.modeloJugadores.añadirEquipo(idJugador, equipo.id);
        this.mostrarJugadores();
    }

    // Metodo para eliminar un jugador por su ID
    eliminarJugador(id) {
        this.modeloJugadores.eliminaJugador(id);
        this.vista.mostrarSuccess("Jugador eliminado con exito.");
        this.mostrarJugadores();
    }

    eliminarEquipo(id) {
        const jugadores = this.modeloJugadores.getJugadoresDeEquipo(id);
        jugadores.forEach((jugador) => {
            this.modeloJugadores.añadirEquipo(jugador.id, 0);
        });

        this.modeloEquipos.eliminarEquipo(id);
        this.vista.mostrarSuccess("Equipo eliminado con exito.");
        this.mostrarEquipos();
    }

    // Metodo para agregar un jugador desde los datos capturados en la vista
    agregarJugadorDesdeVista() {
        // Obtenemos los datos del formulario de jugador
        const datosDelFormulario = this.vista.obtenerDatosFormularioCreacion();

        // Llamamos al metodo para agregar el jugador al modelo
        this.agregarJugador(datosDelFormulario.nombre, datosDelFormulario.posicion, datosDelFormulario.fechaNacimiento, datosDelFormulario.imagen);
    }

    // Metodo para agregar un jugador al modelo
    agregarJugador(nombre, posicion, fechaNacimiento, imagen) {
        // Validamos que todos los campos esten completos
        if (!nombre || !posicion || !fechaNacimiento) {
            this.vista.mostrarError("Por favor, completa todos los campos del jugador.");
            return;
        }

        // Llamamos al metodo del modelo para agregar el jugador
        if (!this.modeloJugadores.addJugador(nombre, posicion, fechaNacimiento, imagen)) {
            this.vista.mostrarError("Datos no validos.");
            return;
        } else {
            this.vista.mostrarSuccess("Jugador agregado con exito.");
            this.mostrarJugadores();
        }
    }

    // Metodo para agregar un equipo desde los datos capturados en la vista
    agregarEquipoDesdeVista() {
        // Obtenemos los datos del formulario de equipo
        const datosDelFormulario = this.vista.obtenerDatosFormularioCreacion();

        // Llamamos al metodo para agregar el equipo al modelo
        this.agregarEquipo(datosDelFormulario.nombre, datosDelFormulario.ciudad, datosDelFormulario.estadio, datosDelFormulario.archivo);
    }

    // Metodo para agregar un equipo al modelo
    agregarEquipo(nombre, ciudad, estadio, imagen) {
        // Validamos que todos los campos esten completos
        if (!nombre || !ciudad || !estadio) {
            this.vista.mostrarError("Por favor, completa todos los campos del equipo.");
            return;
        }

        // Llamamos al metodo del modelo para agregar el equipo
        if (!this.modeloEquipos.agregarEquipo(nombre, ciudad, estadio, imagen)) {
            this.vista.mostrarError("Datos no validos.");
            return;
        } else {
            this.vista.mostrarSuccess("Equipo agregado con exito.");
            this.mostrarEquipos();
        }
    }

    // Metodo para editar un equipo desde los datos capturados en la vista
    actualizarEquipo(idEquipo) {
        let id = idEquipo;
        const datosEquipo = this.vista.obtenerDatosModificaEquipo();
        let nombre = datosEquipo.nombre;
        let ciudad = datosEquipo.ciudad;
        let estadio = datosEquipo.estadio;

        if (!nombre || !ciudad || !estadio) {
            this.vista.mostrarError("Todos los campos deben estar rellenados.");
            return;
        } 

        this.modeloEquipos.editarEquipo(id, nombre, ciudad, estadio);
        this.vista.mostrarSuccess("Equipo actualizado con exito.");
        this.mostrarEquipos();
    }
}
/*Comentario*/