import { Router } from 'express';
import { mantenimientosController } from '../controllers/mantenimientosController';

class MantenimientosRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', mantenimientosController.list);
        this.router.get('/:id', mantenimientosController.getOne);
        this.router.post('/', mantenimientosController.create);
        this.router.delete('/:id', mantenimientosController.delete);
        this.router.put('/:id', mantenimientosController.update);
    }

}

const mantenimientosRoutes = new MantenimientosRoutes();
export default mantenimientosRoutes.router;
