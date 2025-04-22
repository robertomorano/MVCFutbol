class EquipoModel {
  constructor() {
    this.equipos = [];
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
    let equipo = new Equipo(index+1, nombre, ciudad, estadio, "../recursos/pordefecto-equipo.png");
    this.equipos.push(equipo);
  }

  // Agregar un equipo al modelo
  agregarEquipo(nombre, ciudad, estadio, imagen) {
    let agregado = true;
    let url = "";
    let imagenBlob = new Blob([imagen], { type: "image/png" });
    console.log(imagen);
    console.log(imagenBlob);
    if (imagen !== undefined) {
    
        url = URL.createObjectURL(imagenBlob);
        console.log(url);
    }else{
        url = "../recursos/pordefecto-equipo.png";
    }
    
    
    if (this.getEquipoPorNombre(nombre) === null) {
      
      let equipo = new Equipo((this.equipos.length+1), nombre, ciudad, estadio, url);
      this.equipos.push(equipo);
      this.actualizarEquipoLocalStorage();
    }else{
      agregado = false;
    }

    return agregado;
  }
  agregarEquipoEditado(id, nombre, ciudad, estadio) {
    let agregado = true;
    let imagen  = this.equipos[id-1]
    let url = imagen.getImagen();
    
    
    if (this.getEquipoPorNombre(nombre) === null) {
      
      let equipo = new Equipo(id, nombre, ciudad, estadio, url);
      this.equipos.push(equipo);
      this.actualizarEquipoLocalStorage();
    }else{
      agregado = false;
    }

    return agregado;
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
      if (element.id == id) {
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

  editarEquipo(id, nombre, ciudad, estadio) {
    this.eliminarEquipo(id);
    this.agregarEquipoEditado(id, nombre, ciudad, estadio);
  }

  eliminarEquipo(id) {
    let eliminado = false;
    let equipo = this.getEquipoPorId(id);
    if (equipo !== null) {
      this.equipos.splice(this.equipos.indexOf(equipo), 1);
      this.actualizarEquipoLocalStorage();
      eliminado = true;
    }
    //LLamar a setEquipos del equipo eliminado para que se elimine de la lista de jugadores
    return eliminado;
  }
  // opciones de filtrado
  getOrdenAlfabetico() {
    let alfabetico = this.equipos.sort((a, b) => {
        const nombreA = a.nombre;
        const nombreB = b.nombre;
        return nombreA.localeCompare(nombreB);
    });
    return alfabetico;
  }
  getOrdenAlfabeticoDescendente() {
    let alfabetico = this.equipos.sort((a, b) => {
      const nombreA = a.nombre;
      const nombreB = b.nombre;
      return nombreB.localeCompare(nombreA);
  });
  return alfabetico;
  }
  getOrdenCiudad() {
    let ciudad = this.equipos.sort((a, b) => {
        const ciudadA = a.ciudad;
        const ciudadB = b.ciudad;
        return ciudadA.localeCompare(ciudadB);
    });
    return ciudad;
  }
  getOrdenEstadio() {
    console.log(this.equipos);
    let estadio = this.equipos.sort((a, b) => {
      console.log(a.estadio, b.estadio);
        const estadioA = a.estadio;
        const estadioB = b.estadio;
        return estadioA.localeCompare(estadioB);
    });
    return estadio;
  }
  //funcion que devuelve los jugadores con esa cadena
  buscaEquipoPorNombre(cadena){
    let equipoNombres = this.equipos
    equipoNombres = equipoNombres.filter(element => {
        const nombre = element.getNombre();
        return nombre && nombre.toLowerCase().includes(cadena.toLowerCase());
    });
    
    return equipoNombres;
}
}

/*Comentario*/