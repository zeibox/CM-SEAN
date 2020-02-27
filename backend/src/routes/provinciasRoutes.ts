import { Router } from 'express';
import { provinciasController } from '../controllers/provinciasController';

class ProvinciasRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', provinciasController.list);
        this.router.get('/:id', provinciasController.getOne);
        this.router.post('/', provinciasController.create);
        this.router.delete('/:id', provinciasController.delete);
        this.router.put('/:id', provinciasController.update);
    }

}

const provinciasRoutes = new ProvinciasRoutes();
export default provinciasRoutes.router;
