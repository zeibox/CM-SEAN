import { Router } from 'express';
import { actoresController } from '../controllers/actoresController';

class ActoresRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/search/:cadena', actoresController.search);
        this.router.get('/', actoresController.list);
        this.router.get('/:id', actoresController.getOne);
        this.router.post('/', actoresController.create);
        this.router.delete('/:id', actoresController.delete);
        this.router.put('/:id', actoresController.update);
    }

}

const actoresRoutes = new ActoresRoutes();
export default actoresRoutes.router;