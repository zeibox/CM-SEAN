import { Router } from 'express';
import { turnosController } from '../controllers/turnosController';

class TurnosRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', turnosController.list);
        this.router.get('/:id', turnosController.getOne);
        this.router.post('/', turnosController.create);
        this.router.delete('/:id', turnosController.delete);
        this.router.put('/:id', turnosController.update);
    }

}

const turnosRoutes = new TurnosRoutes();
export default turnosRoutes.router;
