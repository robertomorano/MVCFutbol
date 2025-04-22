class Equipo{
    constructor(id, nombre, ciudad, estadio, imagen) {
        this.id = id || 0;
        this.nombre = nombre || "";
        this.ciudad = ciudad || "";
        this.estadio = estadio || "";
        this.imagen = imagen || "";
    }
    getId() {
        return this.id;
    }
    getNombre() {
        return this.nombre;
    }
    getCiudad() {
        return this.ciudad;
    }
    getEstadio() {
        return this.estadio;
    }
    getImagen() {
        return this.imagen;
    }
    setEstadio(estadio) {
        this.estadio = estadio;
    }
   
    
}