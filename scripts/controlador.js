class controlador {
    constructor() {
        this.modelo = new modelo();
        this.vista = new vista();
    }

    iniciar() {
        this.vista.iniciar();
        this.vista.btnAgregar.addEventListener("click", () => this.agregarProducto());
        this.vista.btnEliminar.addEventListener("click", () => this.eliminarProducto());
        this.vista.btnModificar.addEventListener("click", () => this.modificarProducto());
        this.vista.btnBuscar.addEventListener("click", () => this.buscarProducto());
    }

     //agregar un jugador con sus atributos correspondientes a un equipo
     agregarJugador() {
        if () {
            return;
        }
        this.modelo.agregarJugador(nombre, posicion, nacimiento);
    }

    //agregar un equipo con sus atributos correspondientes
    agregarEquipo() {
        if () {
            return;
        }
        this.modelo.agregarEquipo(nombre, ciudad, estadio);
    }

    //asignar un jugador a un equipo
    asignarJugadorAEquipo() {
        if () {
            return;
        }
        this.modelo.asignarJugadorAEquipo(idJugador, idEquipo);
    }

    //Mostrar estadisticas de los jugadores de un equipo
    mostrarEstadisticas() {
        if () {
            return;
        }
        this.modelo.mostrarEstadisticas(idEquipo);
    }
}