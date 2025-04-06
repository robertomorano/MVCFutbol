class EquipoModel {
  constructor() {
    if (localStorage.getItem("equipos") === null) {
      localStorage.setItem("equipos", JSON.stringify([]));
    } else {
      JSON.parse(localStorage.getItem("equipos")).forEach(element => {
        this.agregarEquipo(element.nombre, element.ciudad, element.estadio);
      }); 
    }
  }

  agregarEquipo(nombre, ciudad, estadio, imagen) {
    let url = "";
        
    url = URL.createObjectURL(imagen);
        
    if (this.getEquipoPorNombre(nombre) === null) {
      let equipo = new Equipo(this.equipos.length, nombre, ciudad, estadio, imagen);
      this.equipos.push(equipo);
      this.actualizarEquipoLocalStorage();
      return true;
    }
    return false;
  }
  actualizarEquipoLocalStorage() { 

    localStorage.setItem("equipos", JSON.stringify(this.equipos));
  }
  obtenerEquipos() {
    return this.equipos;
  }
  getEquipoPorID(id) { 
    let equipo = null;
    this.equipos.forEach(element => {
      if (element.getId() === id) {
        equipo = element;
      }
    });
    return equipo;
  }
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
    let equipo = this.getEquipoPorID(id);
    if (equipo !== null) {
      this.equipos.splice(this.equipos.indexOf(equipo), 1);
    }
  }

}