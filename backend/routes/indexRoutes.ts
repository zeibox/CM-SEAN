import { Router } from 'express';
import { indexController } from '../controllers/indexController';

class IndexRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', indexController.index);
    }

}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
