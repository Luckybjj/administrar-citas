import Citas from './clases/Citas.js';
import UI from './clases/UI.js'

import { 
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario,
 } from './selectores.js';

const ui = new UI();
const administrarCitas = new Citas();


let editando;

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
export const datosCitas = (e) => {
    // console.log(e.target.name);
    citaObj[e.target.name] = e.target.value;
    // console.log(citaObj);
}


// Validar y agregar una nueva cita a la clase de citas
export const nuevaCita = (e) => {
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
export const reiniciarObjeto = () => {
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export const eliminarCita = (id) => {
    console.log(id);
    // Eliminar CIta
    administrarCitas.eliminarCita(id);

    // Mostrar el mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    // Refrescar cita
    ui.imprimirCitas(administrarCitas);
}

// Cargar los datos y el modo edicion
export const cargarEdicion = (cita) => {
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