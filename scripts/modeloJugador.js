class JugadorModel{
    constructor(){
        this.jugadores = [];
        if (localStorage.getItem("jugadores") === null) {
            localStorage.setItem("jugadores", JSON.stringify([]));
        }else{
            JSON.parse(localStorage.getItem("jugadores")).forEach(element => {
                this.addJugadorDesdeLocalStorage(element.nombre, element.posicion, element.fechaNacimiento, element.idEquipo, element.imagen)
              }); 
        }
        
    }

    // Devolver todos los jugadores
    getJugadores(){
        return this.jugadores;
    }
    
    // Añadir jugadores a base de datos desde el formulario de añadir jugador
    addJugador(nombre,posicion,fechaNacimiento, imagen){
        let agregado = false;
        let url = "";
        let imagenBlob = new Blob([imagen], { type: "image/png" });
        const posicionesValidas = ["portero", "defensa", "centrocampista", "delantero"];
        console.log(imagen);
        console.log(imagenBlob);
        if (imagen !== undefined) {
        
            url = URL.createObjectURL(imagenBlob);
            console.log(url);
        }else{
            url = "../recursos/imagen_pordefecto.webp";
        }
        
        if (!posicionesValidas.includes(posicion)) {
            agregado = false;
        }
        const fecha = new Date(fechaNacimiento);
        if (
            fecha.getTime() || 
            fecha.getFullYear() < 1900 || fecha.getFullYear() > 2025 || 
            fecha.getMonth() < 0 || fecha.getMonth() > 11 || 
            fecha.getDate() < 1 || fecha.getDate() > 31
        ) {
            agregado = false;
        }
        let index = this.jugadores.length;
        // Iniciar el equipo a null despues con otra funcion se le asignara el id del equipo
        let player = new Jugador(index,nombre,posicion,fechaNacimiento, "" ,url);
        this.jugadores.push(player);
        this.actualizarJugadorLocalStorage();
        agregado = true;
        return agregado;
    }

    // Añadir jugadores a base de datos desde localStorage hace falta crearlos de nuevo a partir de la clase Jugador
    // para que se puedan usar los metodos de la clase Jugador 
    addJugadorDesdeLocalStorage(nombre, posicion, fechaNacimiento, idEquipo, imagen){
        let player = new Jugador(this.jugadores.length,nombre,posicion,fechaNacimiento, idEquipo ,imagen);
        this.jugadores.push(player);
    }
    
    //Guardar nuevos jugadores en el localStorage
    // para que se mantengan al recargar la pagina
    actualizarJugadorLocalStorage(){
        
        localStorage.setItem("jugadores", JSON.stringify(this.jugadores));
    }
    
    // Añadir un equipo a un jugador
    // para que se pueda filtrar por equipo
    añadirEquipo(id, idEquipo){
        
        this.jugadores.forEach(element => {
            if(element.getId() === id){
                element.setIdEquipo(idEquipo);
                return true;
            }
            
        });

    }
    
    editarJugador(id, nombre, posicion, fechaNacimiento, imagen){
        this.eliminaJugador(id);
        this.addJugador(nombre, posicion, fechaNacimiento, imagen);
    }
    eliminaJugador(id){
        let eliminado = false;
        let e = this.getJugadorPorId(id);
        if(e !== null){
            this.jugadores.splice(this.jugadores.indexOf(e),1);
            this.actualizarJugadorLocalStorage();
            eliminado = true;
        }
        return eliminado;
    }
    
    
    
    getJugadorPorNombre(nombre){
        let e = null;
        this.jugadores.forEach(element => {
            if(element.getNombre() === nombre){
                e = element;
            }
        });
        return e;
    }
    
    
    getJugadorPorId(id){
        let e = null;
        this.jugadores.forEach(element => {
            if(element.getId() === id){
                e = element;
            }
        });
    return e;
    }
    
    
    getJugadoresDeEquipo(idEquipo){
        let equipo = null;
        this.jugadores.forEach(element => {
            if(element.getIdEquipo() === idEquipo){
                equipo.push(element);
            }
        });
        return equipo;
    }
    //opciones de filtrado 
    getOrdenAlfabetico(){
        let alfabetico = this.jugadores.sort((a, b) => a.nombre.localeCompare(b.nombre));
        return alfabetico;
    }
    getOrdenAlfabeticoDescendente(){
        let alfabeticoInverso = this.jugadores.sort((a, b) => b.nombre.localeCompare(a.nombre));
        return alfabeticoInverso;
    }
    getOrdenFechaNacimiento(){
        let ordenFecha = this.jugadores.sort((a, b) => a.getEdad() - b.getEdad());
        return ordenFecha;
    }
    getOrdenPosicion(){
        let ordenPosicion;
        for(let i = 0; i < this.jugadores.length; i++){
            if(this.jugadores[i].getPosicion() === "portero"){
                ordenPosicion.push(this.jugadores[i]);
            }
        }
        for(let i = 0; i < this.jugadores.length; i++){
            if(this.jugadores[i].getPosicion() === "defensa"){
                ordenPosicion.push(this.jugadores[i]);
            }
        }
        for(let i = 0; i < this.jugadores.length; i++){
            if(this.jugadores[i].getPosicion() === "centrocampista"){
                ordenPosicion.push(this.jugadores[i]);
            }
        }
        for(let i = 0; i < this.jugadores.length; i++){
            if(this.jugadores[i].getPosicion() === "delantero"){
                ordenPosicion.push(this.jugadores[i]);
            }
        }
        return ordenPosicion;
    }
    //funcion que devuelve los jugadores con esa cadena
    buscaJugadorPorNombre(cadena){
        let jugadorNombres = this.jugadores;
        jugadorNombres = jugadorNombres.filter(element => element.getNombre().toLowerCase().includes(cadena.toLowerCase()));
        
        return jugadorNombres;
    }
    

}