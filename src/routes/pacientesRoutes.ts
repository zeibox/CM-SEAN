import { Router } from 'express';
import { pacientesController } from '../controllers/pacientesController';

class PacientesRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', pacientesController.list);
        this.router.get('/:id', pacientesController.getOne);
        this.router.post('/', pacientesController.create);
        this.router.delete('/:id', pacientesController.delete);
        this.router.put('/:id', pacientesController.update);
    }

}

const pacientesRoutes = new PacientesRoutes();
export default pacientesRoutes.router;
