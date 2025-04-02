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
}