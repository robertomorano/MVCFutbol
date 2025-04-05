class JugadorModel{
    constructor(){
        if (localStorage.getItem("jugadores") === null) {
            localStorage.setItem("jugadores", JSON.stringify([]));
        }else{
            this.jugadores = JSON.parse(localStorage.getItem("jugadores"));
        }
        
    }
    getPlayers(){
        return this.jugadores;
    }
    
    
    addPlayer(nombre,posicion,fechaNacimiento, imagen){
        let player = new Jugador(this.jugadores.length,nombre,posicion,fechaNacimiento, null ,imagen);
        this.jugadores.push(player);
        this.actualizarPlayerLocalStorage();
    }
    
    
    actualizarPlayerLocalStorage(){
        
        localStorage.setItem("jugadores", JSON.stringify(this.jugadores));
    }
    
    
    añadirEquipo(id, idEquipo){
        
        this.jugadores.forEach(element => {
            if(element.getId() === id){
                element.setIdEquipo(idEquipo);
            }
            
        });
    }
    
    
    removePlayer(id){
        let e = this.getPlayerByID(id);
        if(e !== null){
            this.jugadores.splice(this.jugadores.indexOf(e),1);
            this.actualizarPlayerLocalStorage();
        }

    }
    
    
    
    getPlayerByName(nombre){
        let e = null;
        this.jugadores.forEach(element => {
            if(element.getNombre() === nombre){
                e = element;
            }
        });
        return e;
    }
    
    
    getPlayerByID(id){
        let e = null;
        this.jugadores.forEach(element => {
            if(element.getId() === id){
                e = element;
            }
        });
    return e;
    }
    
    
    getPlayersOfTeam(idEquipo){
        let equipo = null;
        this.jugadores.forEach(element => {
            if(element.getIdEquipo() === idEquipo){
                equipo.push(element);
            }
        });
        return equipo;
    }

}