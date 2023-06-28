// Primero se selecionan cada uno de los input del doom, el formulario completo y el espacio donde quedan asignadas las citas
// Campos del formulario
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando

// CLASES
class Citas {
    constructor() {
        this.citas = [];
    }

    agregarCita(cita) {
        this.citas = [...this.citas, cita] // Se genera una copia de this.citas y se le agrega la cita actual
        console.log(this.citas);
    }

    eliminarCita(id) {
        this.citas = this.citas.filter(cita => cita.id !== id)
    }

    editarCita(citaActualizada) {
        // Iteramos cada una de las citas, se verifica que la cita actualizada y la cita actual tengan el mismo id, si se cumplela condicion, se reescribe el objeto
        // con la cita actualizada; de lo contrario se mantiene
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita )
    }

}

class UI {

    imprimirAlerta(mensaje, tipo) {
        // Nuevo div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');
        // Clase en base al tipo de error
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        } else {
            divMensaje.classList.add('alert-success');
        }

        // Mensaje error
        divMensaje.textContent = mensaje;

        // Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'))

        //Quitar alerta
        setTimeout(() => {
            divMensaje.remove()
        }, 3000);
    }

    imprimirCitas({ citas }) {    // se aplica el desestructuracion desde el paramatro, nos permite acceder de forma mas directa al arreglo

        this.limpiarHTML();

        citas.forEach(cita => {
            // Se extraen las propiedades del objeto actual --> citas
            const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita; // se deja un id asociado, este nos permitirá eliminar o editar una cita.
            const divCita = document.createElement('div')
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Telefono: </span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class="font-weight-bolder">Sintomas: </span> ${sintomas}
            `;

            // Boton para eliminar cita
            const btnEliminar = document.createElement('button')
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEliminar.innerHTML = 'Eliminar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>';

            btnEliminar.onclick = () => eliminarCita(id);

            // Botón para editar cita
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" /></svg>'
            btnEditar.onclick = () => cargarEdicion(cita);

            // Agregar los parrafos a divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            // Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);

        });

    }

    limpiarHTML() {
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
}

const ui = new UI();
const administrarCitas = new Citas();


// change --> se dispara despues de que se completa el cambio
// input --> se dispara imediatamente mientras el usuario está interactuando con el elmento.
// submit --> se utiliza en formularios HTML para detectar cuando se envía un formulario. Se dispara cuando un usuario hace click en un botón 
// de envío (<input type="submit">) o presiona la tecla "Enter" mientras está enfocado en un campo de entrada dentro del formulario

// Tendremos un listener para cada uno de los inputs
const eventListeners = () => {
    mascotaInput.addEventListener('change', datosCitas);
    propietarioInput.addEventListener('change', datosCitas);
    telefonoInput.addEventListener('change', datosCitas);
    fechaInput.addEventListener('change', datosCitas);
    horaInput.addEventListener('change', datosCitas);
    sintomasInput.addEventListener('change', datosCitas);

    formulario.addEventListener('submit', nuevaCita);

}


// La idea es al tiempo que se escriba en el input se llene la propiedad del objeto.
// Para ello en el HTML se debe tener definida la propiedad de "name" con el mismo nombre de las propiedades del objeto
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

// Agregando datos al objeto de cita
const datosCitas = (e) => {
    // console.log(e.target.name);
    citaObj[e.target.name] = e.target.value;
    // console.log(citaObj);
}

// Validar y agregar una nueva cita a la clase de citas
const nuevaCita = (e) => {
    e.preventDefault()

    // Extraer la información del objeto de cita
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;

    // Validar
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        // console.log('Todos los campos son obligatorios');
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');

        return; // para que no ejecute la sigueinte linea, aunque este dentro de un if 
    }

    if (editando) {
        console.log('Modo Edicion');
        ui.imprimirAlerta('Editado Correctamente');

        // Pasar el objeto de la cita
        administrarCitas.editarCita({...citaObj});
        // Regresar el texto del boton a suu estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        // Quitar modo edicion
        editando = false

    } else {
        console.log('Modo Nueva Cita');
        // Generar un id único
        citaObj.id = Date.now();
        // Creando una nueva cita
        administrarCitas.agregarCita({ ...citaObj }); // se le pasa una copia del contenido del objeto para no pasarle toda la referencia del objeto
        
        // MEnsaje de agregado dcorrrectamente
        ui.imprimirAlerta('Se agregó correctamente')
    }


    // Reiniciar objeto --> el objeto queda con las propiedades por lo cual igual debe reiniciarse
    reiniciarObjeto();
    // Reinicio de formulario una vez que ya fue enviado
    formulario.reset();
    // Mostrar en el HTML las citas
    ui.imprimirCitas(administrarCitas);
}

// Se crea una funcion para reiniciar el objeto, ya que solo se reinicio el formulario, entonces al hacer click en crear cita
// se agregará un objto en el array de las citas.
const reiniciarObjeto = () => {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

const eliminarCita = (id) => {
    console.log(id);
    // Eliminar CIta
    administrarCitas.eliminarCita(id);

    // Mostrar el mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    // Refrescar cita
    ui.imprimirCitas(administrarCitas);
}

// Cargar los datos y el modo edicion
const cargarEdicion = (cita) => {
    // console.log(cita);
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Llenar las entradas
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    // Lenar el objero
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Cambias boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    // Modo edicion
    editando = true;

}


eventListeners(); 