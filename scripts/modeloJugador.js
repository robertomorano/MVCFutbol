class JugadorModel{
    constructor(){
        this.jugadores = [];
        if (localStorage.getItem("jugadores") === null) {
            localStorage.setItem("jugadores", JSON.stringify([]));
        }else{
            JSON.parse(localStorage.getItem("jugadores")).forEach(element => {
                this.addPlayerLocalStorage(element.nombre, element.posicion, element.fechaNacimiento, element.idEquipo, element.imagen)
              }); 
        }
        
    }
    getPlayers(){
        return this.jugadores;
    }
    
    // Añadir jugadores a base de datos desde el formulario de añadir jugador
    addPlayer(nombre,posicion,fechaNacimiento, imagen){
        let url = "";
        
        url = URL.createObjectURL(imagen);
        let index = this.jugadores.length;
        // Iniciar el equipo a null despues con otra funcion se le asignara el id del equipo
        let player = new Jugador(index,nombre,posicion,fechaNacimiento, null ,imagen);
        this.jugadores.push(player);
        this.actualizarPlayerLocalStorage();
        return true;
    }

    // Añadir jugadores a base de datos desde localStorage hace falta crearlos de nuevo a partir de la clase Jugador
    // para que se puedan usar los metodos de la clase Jugador 
    addPlayerLocalStorage(nombre, posicion, fechaNacimiento, idEquipo, imagen){
        let player = new Jugador(this.jugadores.length,nombre,posicion,fechaNacimiento, idEquipo ,imagen);
        this.jugadores.push(player);

    }
    
    //Guardar nuevos jugadores en el localStorage
    // para que se mantengan al recargar la pagina
    actualizarPlayerLocalStorage(){
        
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