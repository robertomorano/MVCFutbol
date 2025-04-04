class Vista {
    constructor() {
        // Obtener el modal
        this.modal = document.getElementById("myModal");

        // Obtener el botón que abre el modal
        this.btn = document.getElementById("openModalBtn");

        // Agregar el evento al botón para abrir el modal
        this.btn.addEventListener("click", () => {
            this.abreModal();
            this.modal.style.display = "block";  // Mostrar el modal
        });

        // Cuando el usuario haga clic en <span> (x), se cierra el modal
        this.span = null;  // Inicialmente null, ya que lo asignamos dinámicamente
        this.modalContent = null;  // Referencia al contenido del modal

        // Cuando el usuario haga clic fuera del modal, también se cierra
        window.addEventListener("click", (event) => {
            if (event.target == this.modal) {
                this.modal.style.display = "none";
            }
        });
    }

    abreModal() {
        // Limpiar el contenido anterior del modal
        this.modal.innerHTML = ''; // Limpiamos cualquier contenido previo

        // Crear el contenedor del contenido del modal
        this.modalContent = document.createElement("div");
        this.modalContent.classList.add("modal-content");

        // Crear el botón de cierre
        this.span = document.createElement("span");
        this.span.classList.add("close");
        this.span.innerHTML = "&times;";  // Símbolo para cerrar el modal

        // Agregar el evento al botón de cierre
        this.span.addEventListener("click", () => {
            this.modal.style.display = "none";
        });

        // Crear el título del modal
        const title = document.createElement("div");
        title.classList.add("alinea_h3");
        title.innerHTML = "<h3>Introduce un Nuevo Jugador</h3>";

        // Crear el formulario dentro del modal
        const form = document.createElement("div");
        form.classList.add("formulario");

        form.innerHTML = `
            <form>
                <label for="imp_nombre_jugador">Nombre del Jugador</label>
                <input type="text" name="impNombre" id="imp_nombre_jugador" placeholder="Nombre">
                <label for="imp_posicion_jugador">Posición del Jugador</label>
                <input type="text" name="impPosicion" id="imp_posicion_jugador" placeholder="Posición">
                <label for="imp_fecha_nacimiento">Fecha Nacimiento</label>
                <input type="date" name="impFechaNacimiento" id="imp_fecha_nacimiento">
                <button type="button">Crear</button>
            </form>
        `;

        // Agregar todo el contenido al modalContent
        this.modalContent.appendChild(this.span);
        this.modalContent.appendChild(title);
        this.modalContent.appendChild(form);

        // Agregar el modalContent al modal
        this.modal.appendChild(this.modalContent);
    }
}
