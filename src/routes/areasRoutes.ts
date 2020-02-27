import { Router } from 'express';
import { areasController } from '../controllers/areasController';

class AreasRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', areasController.list);
        this.router.get('/:id', areasController.getOne);
        this.router.post('/', areasController.create);
        this.router.delete('/:id', areasController.delete);
        this.router.put('/:id', areasController.update);
    }

}

const areasRoutes = new AreasRoutes();
export default areasRoutes.router;
