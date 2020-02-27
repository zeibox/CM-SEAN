import { Router } from 'express';
import { domiciliosController } from '../controllers/domiciliosController';

class DomiciliosRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', domiciliosController.list);
        this.router.get('/:id', domiciliosController.getOne);
        this.router.post('/', domiciliosController.create);
        this.router.delete('/:id', domiciliosController.delete);
        this.router.put('/:id', domiciliosController.update);
    }

}

const domiciliosRoutes = new DomiciliosRoutes();
export default domiciliosRoutes.router;
