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
        let jugadoresFiltrados = this.modeloJugadores.getJugadores().slice();

        switch (filtro) {
            case 'nombre a-z':
                jugadoresFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case 'nombre z-a':
                jugadoresFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
            case 'posición':
                jugadoresFiltrados.sort((a, b) => a.posicion.localeCompare(b.posicion));
                break;
            case 'edad':
                jugadoresFiltrados.sort((a, b) => {
                    const edadA = new Date().getFullYear() - new Date(a.fechaNacimiento).getFullYear();
                    const edadB = new Date().getFullYear() - new Date(b.fechaNacimiento).getFullYear();
                    return edadA - edadB; // Menor edad primero
                });
                break;
        }

        mostrarJugadores(jugadoresFiltrados);
    }

    // Metodo para filtrar los equipos por nombre, ciudad o estadio
    filtrarEquipos(filtro) {
        let equiposFiltrados = this.modeloEquipos.getEquipos().slice();
    
        switch (filtro) {
            case 'nombre a-z':
                equiposFiltrados.sort((a, b) => a.nombre.localeCompare(b.nombre));
                break;
            case 'nombre z-a':
                equiposFiltrados.sort((a, b) => b.nombre.localeCompare(a.nombre));
                break;
            case 'ciudad':
                equiposFiltrados.sort((a, b) => a.ciudad.localeCompare(b.ciudad));
                break;
            case 'estadio':
                equiposFiltrados.sort((a, b) => a.estadio.localeCompare(b.estadio));
                break;
        }
    
        mostrarEquipos(equiposFiltrados);
    }    

    // Metodo para buscar por termino
    

    // Metodo para mostrar los jugadores en la vista
    mostrarJugadores() {
        const jugadores = this.modeloJugadores.getJugadores();
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
        if (equipo.length !== 0) {
        for (let i = 0; i < equipo.length; i++) {
            this.vista.renderizarVista(equipo[i]);
        }
        } else {
            this.vista.mostrarMensajeVacio('equipo');
        }
    }

//
    // Metodo para obtener la lista de jugadores desde el modelo
    obtenerJugadores() {
        return this.modeloJugadores.getJugadores();
    }
    
    // Metodo para obtener la lista de equipos desde el modelo
    obtenerEquipos() {
        return this.modeloEquipos.getEquipos();
    }    

//
    // Metodo para obtener un jugador especifico por su ID
    obtenerJugadorPorId(id) {
        return this.modeloJugadores.getJugadorPorId(id);
    }

    // Metodo para obtener un equipo especifico por su ID
//    obtenerEquipoPorId(id) {
//    return this.modeloEquipos.getEquipoPorId(id);
//    }

    // Metodo para obtener un equipo especifico por su ID y mostrarlo en un modal
    obtenerParaModalEquipos(id) {
        const equipo = this.modeloEquipos.getEquipoPorId(id);

        if (equipo) {
            const jugadores = this.modeloJugadores.getJugadoresDeEquipo(equipo.id);
            this.vista.mostrarModalEquipo(equipo, jugadores);
        }
    }

    // Metodo para obtener un jugador especifico por su ID y mostrarlo en un modal
    obtenerParaModalJugadores(id) {
        const jugador = this.modeloJugadores.getJugadorPorId(id);

        const equipo = this.modeloEquipos.getEquipoPorId(jugador.getEquipo());
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
    }

    // Metodo para eliminar un jugador por su ID
    eliminarJugador(id) {
        this.modeloJugadores.eliminaJugador(id);
    }

    // Metodo para agregar un jugador desde los datos capturados en la vista
    agregarJugadorDesdeVista() {
        // Obtenemos los datos del formulario de jugador
        const nombre = document.getElementById("imp_nombre_jugador").value;
        const posicion = document.getElementById("imp_posicion_jugador").value;
        const fechaNacimiento = document.getElementById("imp_fecha_nacimiento").value;
        const archivo = document.getElementById("imp_imagen_jugador").files[0];

        // Llamamos al metodo para agregar el jugador al modelo
        this.agregarJugador(nombre, posicion, fechaNacimiento, archivo);
    }

    // Metodo para agregar un jugador al modelo
    agregarJugador(nombre, posicion, fechaNacimiento, imagen) {
        // Validamos que todos los campos esten completos
        if (!nombre || !posicion || !fechaNacimiento) {
            this.vista.mostrarError("Por favor, completa todos los campos del jugador.");
            return;
        }

        // Llamamos al metodo del modelo para agregar el jugador
        this.modeloJugadores.addJugador(nombre, posicion, fechaNacimiento, imagen);

        this.vista.mostrarSuccess("Jugador agregado con exito.");
    }

    // Metodo para agregar un equipo desde los datos capturados en la vista
    agregarEquipoDesdeVista() {
        // Obtenemos los datos del formulario de equipo
        const nombre = document.getElementById("imp_nombre_equipo").value;
        const ciudad = document.getElementById("imp_ciudad_equipo").value;
        const estadio = document.getElementById("imp_nombre_estadio").value;
        const archivo = document.getElementById("imp_imagen_equipo").files[0];

        // Llamamos al metodo para agregar el equipo al modelo
        this.agregarEquipo(nombre, ciudad, estadio, archivo);
    }

    // Metodo para agregar un equipo al modelo
    agregarEquipo(nombre, ciudad, estadio, imagen) {
        // Validamos que todos los campos esten completos
        if (!nombre || !ciudad || !estadio) {
            this.vista.mostrarError("Por favor, completa todos los campos del equipo.");
            return;
        }

        // Llamamos al metodo del modelo para agregar el equipo
        this.modeloEquipos.agregarEquipo(nombre, ciudad, estadio, imagen);

        this.vista.mostrarSuccess("Equipo agregado con exito");
    }
}
