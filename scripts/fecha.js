class Fecha{
    constructor(fecha){
        this.fecha = this.textoAFecha(fecha);
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
    getFecha(){
        return this.fecha;
    }
}