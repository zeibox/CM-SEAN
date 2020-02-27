import { Router } from 'express';
import { medicosEspecialidadesController } from '../controllers/medicosEspecialidadesController';

class MedicosEspecialidadesRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', medicosEspecialidadesController.list);
        this.router.get('/:id', medicosEspecialidadesController.getOne);
        this.router.post('/', medicosEspecialidadesController.create);
        this.router.delete('/:id', medicosEspecialidadesController.delete);
        this.router.put('/:id', medicosEspecialidadesController.update);
    }

}

const medicosEspecialidadesRoutes = new MedicosEspecialidadesRoutes();
export default medicosEspecialidadesRoutes.router;
