import { Router } from 'express';
import { juegosController } from '../controllers/juegosController';

class JuegosRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', juegosController.list);
        this.router.get('/:id', juegosController.getOne);
        this.router.post('/', juegosController.create);
        this.router.delete('/:id', juegosController.delete);
        this.router.put('/:id', juegosController.update);
    }

}

const juegosRoutes = new JuegosRoutes();
export default juegosRoutes.router;
