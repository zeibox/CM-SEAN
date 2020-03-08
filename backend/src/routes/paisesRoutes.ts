import { Router } from 'express';
import { paisesController } from '../controllers/paisesController';

class PaisesRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', paisesController.list);
        this.router.get('/:id', paisesController.getOne);
        this.router.post('/', paisesController.create);
        this.router.get('/byname/:name', paisesController.getbyName);
        this.router.delete('/:id', paisesController.delete);
        this.router.put('/:id', paisesController.update);
    }

}

const paisesRoutes = new PaisesRoutes();
export default paisesRoutes.router;
