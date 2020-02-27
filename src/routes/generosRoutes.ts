import { Router } from 'express';
import { generosController } from '../controllers/generosController';

class GenerosRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', generosController.list);
        this.router.get('/:id', generosController.getOne);
        this.router.post('/', generosController.create);
        this.router.delete('/:id', generosController.delete);
        this.router.put('/:id', generosController.update);
    }

}

const generosRoutes = new GenerosRoutes();
export default generosRoutes.router;
