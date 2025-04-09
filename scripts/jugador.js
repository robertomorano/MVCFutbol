class Jugador {
    constructor(id,nombre, posicion, fechaNacimiento, idEquipo, imagen) {
        this.imagen = imagen;
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
        return this.fechaATexto(this.fechaNacimiento);
    }
    getIdEquipo() {
        return this.idEquipo;
    }
    getImagen() {
        return this.imagen;
    }
    getEquipo() {
        return this.idEquipo;
    }
    getEdad() {
        const fechaActual = new Date();
        let year = fechaActual-this.fechaNacimiento;
        return year;
    }
    setPosicion(posicion) {
        this.posicion = posicion;
    }
    setIdEquipo(idEquipo) {
       this.idEquipo = idEquipo;
    }
    textoAFecha(fechaNacimiento){
        let year = "";
        let month = "";
        let day = "";
        fechaNacimiento += "";
        //console.log(fechaNacimiento);//2023-10-10
            if(fechaNacimiento[4] === "-"){
                year = fechaNacimiento.slice(0,4);
                month = fechaNacimiento.slice(5,7);
                day = fechaNacimiento.slice(8,10);
            }  
        return new Date(year, month-1, day);
    }
    fechaATexto(fecha){
        let year = fecha.getFullYear();
        let month = fecha.getMonth()+1;
        let day = fecha.getDate();
        return `${day}/${month}/${year}`;
    }
    

}
