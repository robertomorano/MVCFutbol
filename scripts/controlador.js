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

    // Metodo para obtener un equipo especifico por su ID
    obtenerEquipoPorId(id) {
        return this.modeloEquipos.getEquipoPorId(id);
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
    eliminarJugadorPorId(id) {
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
    agregarJugador(nombre, posicion, fechaNacimiento, imagen = "") {
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
    agregarEquipo(nombre, ciudad, estadio) {
        // Validamos que todos los campos esten completos
        if (!nombre || !ciudad || !estadio) {
            this.vista.mostrarError("Por favor, completa todos los campos del equipo.");
            return;
        }

        // Llamamos al metodo del modelo para agregar el equipo
        this.modeloEquipos.agregarEquipo(nombre, ciudad, estadio);

        this.vista.mostrarSuccess("Equipo agregado con exito");
    }
}
