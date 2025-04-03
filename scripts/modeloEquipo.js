class EquipoModel {
  constructor() {
    this.equipos = [];
  }

  agregarEquipo(equipo) {
    this.equipos.push(equipo);
  }

  obtenerEquipos() {
    return this.equipos;
  }
  obtenerEquipoPorID(id) { 
    let equipo = null;
    this.equipos.forEach(element => {
      if (element.getId() === id) {
        equipo = element;
      }
    });
    return equipo;
  }
  eliminarEquipo(id) {
    let equipo = this.obtenerEquipoPorID(id);
    if (equipo !== null) {
      this.equipos.splice(this.equipos.indexOf(equipo), 1);
    }
  }
}