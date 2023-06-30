import { datosCitas, nuevaCita } from "../funciones.js";
import { 
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario,
 } from '../selectores.js';

class App { 
    constructor () {
        this.initApp();
    }

    initApp() {
        mascotaInput.addEventListener('change', datosCitas);
        propietarioInput.addEventListener('change', datosCitas);
        telefonoInput.addEventListener('change', datosCitas);
        fechaInput.addEventListener('change', datosCitas);
        horaInput.addEventListener('change', datosCitas);
        sintomasInput.addEventListener('change', datosCitas);
    
        formulario.addEventListener('submit', nuevaCita);
    }
}

export default App;