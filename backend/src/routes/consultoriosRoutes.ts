import { Router } from 'express';
import { consultoriosController } from '../controllers/consultoriosController';

class ConsultoriosRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', consultoriosController.list);
        this.router.get('/:id', consultoriosController.getOne);
        this.router.post('/', consultoriosController.create);
        this.router.delete('/:id', consultoriosController.delete);
        this.router.put('/:id', consultoriosController.update);
    }

}

const consultoriosRoutes = new ConsultoriosRoutes();
export default consultoriosRoutes.router;
