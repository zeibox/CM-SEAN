import { Router } from 'express';
import { areasHorariosController } from '../controllers/areasHorariosController';

class AreasHorariosRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', areasHorariosController.list);
        this.router.get('/:id', areasHorariosController.getOne);
        this.router.post('/', areasHorariosController.create);
        this.router.delete('/:id', areasHorariosController.delete);
        this.router.put('/:id', areasHorariosController.update);
    }

}

const areasHorariosRoutes = new AreasHorariosRoutes();
export default areasHorariosRoutes.router;
