import { Router } from 'express';
import { localidadesController } from '../controllers/localidadesController';

class LocalidadesRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', localidadesController.list);
        this.router.get('/:id', localidadesController.getOne);
        this.router.post('/', localidadesController.create);
        this.router.delete('/:id', localidadesController.delete);
        this.router.put('/:id', localidadesController.update);
    }

}

const localidadesRoutes = new LocalidadesRoutes();
export default localidadesRoutes.router;
