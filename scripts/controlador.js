class Controlador {
    constructor() {
        this.modeloJugadores = null;
        this.modeloEquipos = null;
        this.vista = null;
    }

    setModeloEquipo(modeloEquipos) {
        this.modeloEquipos = modeloEquipos;
    }

    setModeloJugador(modeloJugadores) {
        this.modeloJugadores = modeloJugadores;
    }

    setVista(vista) {
        this.vista = vista;
    }

    // Metodo para obtener los jugadores desde el modelo
    obtenerJugadores() {
        return this.modeloJugadores.getPlayers();
    }
    
    // Metodo para obtener los equipos desde el modelo
    obtenerEquipos() {
        return this.modeloEquipos.obtenerEquipos();
    }    

    // Metodo para obtener un jugador por su ID
    obtenerJugadorPorId(id) {
        return this.modeloJugadores.getPlayerById(id);
    }

    // Metodo para obtener un equipo por su ID
    obtenerEquipoPorId(id) {
        return this.modeloEquipos.obtenerEquipoPorId(id);
    }

    // Metodo para obtener equipo por nombre
    obtenerEquipoPorNombre(nombre) {
        return this.modeloEquipos.obtenerEquipoPorNombre(nombre);
    }

    // Metodo para obtener jugadores por equipo
    obtenerJugadoresPorEquipo(nombreEquipo) {
        const equipo = this.modeloEquipos.obtenerEquipoPorNombre(nombreEquipo);
        if (!equipo) {
            console.log("Equipo no encontrado.");
            return;
        }
        return this.modeloJugadores.getPlayersOfTeam(equipo.id);
    }

    // Metodo para asignar equipo a un jugador
    asignarEquipoAJugador(idJugador, nombreEquipo) {
        const equipo = this.modeloEquipos.obtenerEquipoPorNombre(nombreEquipo);
        if (!equipo) {
            console.log("Equipo no encontrado.");
            return;
        }
        this.modeloJugadores.añadirEquipo(idJugador, equipo.id);
    }

    // Metodo para eliminar un jugador por su ID
    eliminarJugadorPorId(id) {
        this.modeloJugadores.removePlayer(id);
    }

    // Metodo para obtener los equipos
    obtenerEquipos() {
        return this.modeloEquipos.obtenerEquipos();
    }

    // Metodo para obtener los jugadores
    obtenerJugadores() {
        return this.modeloJugadores.getPlayers();
    }

    // Método para agregar un jugador desde la vista
    agregarJugadorDesdeVista() {
        // Capturar los datos del formulario del jugador
        const nombre = document.getElementById("imp_nombre_jugador").value;
        const posicion = document.getElementById("imp_posicion_jugador").value;
        const fechaNacimiento = document.getElementById("imp_fecha_nacimiento").value;
        const archivo = document.getElementById("imp_imagen_jugador").files[0];

        // Convertir la imagen a URL temporal o base64
        let imagen = "";
        if (archivo) {
            imagen = URL.createObjectURL(archivo);
        }

        // Llamar al método para agregar el jugador
        this.agregarJugador(nombre, posicion, fechaNacimiento, imagen);
    }

   // Metodo para agregar un jugador al modelo
    agregarJugador(nombre, posicion, fechaNacimiento, imagen = "") {
        if (!nombre || !posicion || !fechaNacimiento) {
            console.log("Por favor, completa todos los campos del jugador.");
            return;
        }

        // Llamar al metodo del modelo para agregar el jugador
        this.modeloJugadores.addPlayer(nombre, posicion, fechaNacimiento, imagen);

        console.log("Jugador agregado con éxito");
    }


    // Metodo para agregar un equipo desde la vista
    agregarEquipoDesdeVista() {
        // Capturar los datos del formulario del equipo
        const nombre = document.getElementById("imp_nombre_equipo").value;
        const ciudad = document.getElementById("imp_ciudad_equipo").value;
        const estadio = document.getElementById("imp_nombre_estadio").value;
        const archivo = document.getElementById("imp_imagen_equipo").files[0];

        // Convertir la imagen a URL temporal o base64
        let imagen = "";
        if (archivo) {
            imagen = URL.createObjectURL(archivo);
        }

        // Llamar al metodo para agregar el equipo
        this.agregarEquipo(nombre, ciudad, estadio, imagen);
    }

    // Metodo para agregar un equipo al modelo
    agregarEquipo(nombre, ciudad, estadio) {
        if (!nombre || !ciudad || !estadio) {
            alert("Por favor, completa todos los campos del equipo.");
            return;
        }

        // Llamar al metodo del modelo para agregar el equipo
        this.modeloEquipos.agregarEquipo(nombre, ciudad, estadio);

        alert("Equipo agregado con éxito");
    }
}