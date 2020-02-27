import { Router } from 'express';
import { jerarquiasController } from '../controllers/jerarquiasController';

class JerarquiasRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', jerarquiasController.list);
        this.router.get('/:id', jerarquiasController.getOne);
        this.router.post('/', jerarquiasController.create);
        this.router.delete('/:id', jerarquiasController.delete);
        this.router.put('/:id', jerarquiasController.update);
    }

}

const jerarquiasRoutes = new JerarquiasRoutes();
export default jerarquiasRoutes.router;
