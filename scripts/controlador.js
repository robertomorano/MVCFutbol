class Controlador {
    constructor() {
        this.modeloJugadores = new JugadorModel();
        this.modeloEquipos = new EquipoModel();
        this.vista = new Vista(this); // Le pasamos el controlador a la vista
    }

    iniciar() {
        // Escuchar evento de clic para agregar jugador
        document.getElementById("btn_crea_jugador").addEventListener("click", () => {
            this.agregarJugadorDesdeVista();
        });

        // Escuchar evento de clic para agregar equipo
        document.getElementById("btn_crea_equipo").addEventListener("click", () => {
            this.agregarEquipoDesdeVista();
        });
    }

    // Método para obtener los jugadores desde el modelo
    obtenerJugadores() {
        return this.modeloJugadores.getPlayers();
    }
    
    // Método para obtener los equipos desde el modelo
    obtenerEquipos() {
        return this.modeloEquipos.obtenerEquipos();
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

   // Método para agregar un jugador al modelo
    agregarJugador(nombre, posicion, fechaNacimiento, imagen = "") {
        if (!nombre || !posicion || !fechaNacimiento) {
            alert("Por favor, completa todos los campos del jugador.");
            return;
        }

        // Crear un nuevo jugador
        const nuevoJugador = new Jugador(
            this.modeloJugadores.getPlayers().length, // ID basado en la longitud actual
            nombre,
            posicion,
            fechaNacimiento,
            imagen
        );

        // Llamar al método del modelo para agregar el jugador
        this.modeloJugadores.addPlayer(nuevoJugador);

        alert("Jugador agregado con éxito");
    }


    // Método para agregar un equipo desde la vista
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

        // Llamar al método para agregar el equipo
        this.agregarEquipo(nombre, ciudad, estadio, imagen);
    }

    // Método para agregar un equipo al modelo
    agregarEquipo(nombre, ciudad, estadio, imagen = "") {
        if (!nombre || !ciudad || !estadio) {
            alert("Por favor, completa todos los campos del equipo.");
            return;
        }

        const nuevoId = this.modeloEquipos.obtenerEquipos().length;
        const nuevoEquipo = new Equipo(nuevoId, nombre, ciudad, estadio, imagen);

        // Llamar al método del modelo para agregar el equipo
        this.modeloEquipos.agregarEquipo(nuevoEquipo);

        alert("Equipo agregado con éxito");
    }

    // Método para asignar un jugador a un equipo
    asignarJugadorAEquipo(idJugador, idEquipo) {
        if (idJugador === undefined || idEquipo === undefined) {
            alert("Debes proporcionar el ID del jugador y del equipo.");
            return;
        }

        this.modeloJugadores.añadirEquipo(idJugador, idEquipo);
        localStorage.setItem("jugadores", JSON.stringify(this.modeloJugadores.jugadores));
    }

    // Método para mostrar las estadísticas de los jugadores de un equipo
    mostrarEstadisticas(idEquipo) {
        const jugadores = this.modeloJugadores.getPlayersOfTeam(idEquipo);
        if (!jugadores || jugadores.length === 0) {
            console.log("Este equipo no tiene jugadores asignados.");
            return;
        }

        console.log(`Estadísticas del equipo con ID ${idEquipo}:`);
        jugadores.forEach(j => {
            console.log(`${j.getNombre()} - ${j.getPosicion()} - ${j.getFechaNacimiento()}`);
        });
    }
}
