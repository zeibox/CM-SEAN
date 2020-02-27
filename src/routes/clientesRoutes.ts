import { Router } from 'express';
import { clientesController } from '../controllers/clientesController';

class ClientesRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', clientesController.list);
        this.router.get('/:id', clientesController.getOne);
        this.router.post('/', clientesController.create);
        this.router.delete('/:id', clientesController.delete);
        this.router.put('/:id', clientesController.update);
    }

}

const clientesRoutes = new ClientesRoutes();
export default clientesRoutes.router;
