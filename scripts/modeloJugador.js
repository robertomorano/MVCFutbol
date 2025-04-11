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
        console.log(imagen);
        console.log(imagenBlob);
        if (imagen !== undefined) {
        
            url = URL.createObjectURL(imagenBlob);
            console.log(url);
        }else{
            url = "../recursos/imagen_pordefecto.webp";
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

}