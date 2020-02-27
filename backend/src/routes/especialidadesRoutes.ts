import { Router } from 'express';
import { especialidadesController } from '../controllers/especialidadesController';

class EspecialidadesRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', especialidadesController.list);
        this.router.get('/:id', especialidadesController.getOne);
        this.router.post('/', especialidadesController.create);
        this.router.delete('/:id', especialidadesController.delete);
        this.router.put('/:id', especialidadesController.update);
    }

}

const especialidadesRoutes = new EspecialidadesRoutes();
export default especialidadesRoutes.router;
