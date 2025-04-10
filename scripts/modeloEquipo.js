class EquipoModel {
  constructor() {
    this.equipos = [];
    this.inicializarEquiposLocalStorage();
    if (localStorage.getItem("equipos") === null) {
      localStorage.setItem("equipos", JSON.stringify([]));
    } else {
      JSON.parse(localStorage.getItem("equipos")).forEach(element => {
        this.inicializarEquiposLocalStorage(element.nombre, element.ciudad, element.estadio, element.imagen);
      }); 
    }
  }

  // Inicializa los equipos en el localStorage
  inicializarEquiposLocalStorage(nombre, ciudad, estadio, imagen) {
    
    let index = this.equipos.length;
    let equipo = new Equipo(index, nombre, ciudad, estadio, imagen);
    this.equipos.push(equipo);
  }

  // Agregar un equipo al modelo
  agregarEquipo(nombre, ciudad, estadio, imagen) {
    let url = "";
    let imagenBlob = new Blob([imagen], { type: "image/png" });
    console.log(imagen);
    console.log(imagenBlob);
    if (imagen !== undefined) {
      
      url = url.createObjectURL(imagenBlob);
      console.log(url);
    }
    
        
    if (this.getEquipoPorNombre(nombre) === null) {
      
      let equipo = new Equipo(this.equipos.length, nombre, ciudad, estadio, url);
      this.equipos.push(equipo);
      this.actualizarEquipoLocalStorage();
      return true;
    }
    return false;
  }

  //Guardar en localStorage los equipos
  actualizarEquipoLocalStorage() { 

    localStorage.setItem("equipos", JSON.stringify(this.equipos));
  }

  // get de equipos
  getEquipos() {
    return this.equipos;
  }

  // get de equipos pasando el id
  getEquipoPorId(id) { 
    let equipo = null;
    this.equipos.forEach(element => {
      if (element.getId() === id) {
        equipo = element;
      }
    });
    return equipo;
  }

  // get de equipos pasando el nombre
  getEquiposPorCiudad(ciudad) {
    let equiposCiudad = [];
    this.equipos.forEach(element => {
      if (element.getCiudad() === ciudad) {
        equiposCiudad.push(element);
      }
    });
  }



  getEquipoPorNombre(nombre) {
    let equipo = null;
    this.equipos.forEach(element => {
      if (element.getNombre() === nombre) {
        equipo = element;
      }
    });
    return equipo;
  }



  eliminarEquipo(id) {
    let eliminado = false;
    let equipo = this.getEquipoPorId(id);
    if (equipo !== null) {
      this.equipos.splice(this.equipos.indexOf(equipo), 1);
      this.actualizarEquipoLocalStorage();
      eliminado = true;
    }
    return eliminado;
  }

}