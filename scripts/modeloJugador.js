class jugadorModel{
    constructor(){
        jugadores = [];
    }
    
    addPlayer(player){
        this.jugadores.push(player);
    }
    removePlayer(id){
        let e = this.getPlayerByID(id);
        if(e !== null){
            this.jugadores.splice(this.jugadores.indexOf(e),1);
        }
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
    getPlayerOfTeam(idEquipo){
        let equipo = null;
        this.jugadores.forEach(element => {
            if(element.getIdEquipo() === idEquipo){
                equipo.push(element);
            }
        });
        return equipo;
    }
    
}