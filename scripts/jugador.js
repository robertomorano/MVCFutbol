class Jugador {
    constructor(id,nombre, posicion, fechaNacimiento, idEquipo) {
        this.id = id;
        this.nombre = nombre;
        this.posicion = posicion;
        
        for(let i = fechaNacimiento.length; i >0 ; i--) {
            if (fechaNacimiento[i] != "/") {
                
            }
        }
        this.fechaNacimiento = new Date(fechaNacimiento);
        
        this.idEquipo = idEquipo;
    }
    getId() {
        return this.id;
    }
    getNombre() {
        return this.nombre;
    }
    getPosicion() {
        return this.posicion;
    }
    getFechaNacimiento() {
        return this.fechaNacimiento;
    }
    getIdEquipo() {
        return this.idEquipo;
    }
    getEdad() {
        const fechaActual = new Date();
        
        
        
        
    }


}
