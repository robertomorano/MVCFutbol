class Equipo{
    constructor(id,nombre,ciudad, estadio) {
        this.nombre = nombre;
        this.id = id;
        this.ciudad = ciudad;  
        this.estadio = estadio;
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
    setEstadio(estadio) {
        this.estadio = estadio;
    }
   
    
}