class Jugador {
    constructor(id,nombre, posicion, fechaNacimiento, idEquipo) {
        this.id = id;
        this.nombre = nombre;
        this.posicion = posicion;
        
        this.fechaNacimiento = this.textoAFecha(fechaNacimiento);
        
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
        let year = fechaActual-this.fechaNacimiento;
        return year;
    }
    textoAFecha(fechaNacimiento){
        let year;
        let month;
        let day;
        for(let i = fechaNacimiento.length; i >0 ; i--) {
            if (i>=fechaNacimiento.length-4) {
                year += fechaNacimiento[i];
            }
            if(i>=fechaNacimiento.length-7&&i<fechaNacimiento.length-4 && fechaNacimiento[i] !== "/"){
                month += Number(fechaNacimiento[i]);
            }
            if(i<fechaNacimiento.length-7){
                day += fechaNacimiento[i];
            }
        }
        return new Date(year, month-1, day);
    }


}
