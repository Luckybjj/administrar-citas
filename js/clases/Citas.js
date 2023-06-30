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

export default Citas;