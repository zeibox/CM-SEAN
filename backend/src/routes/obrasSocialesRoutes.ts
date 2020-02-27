import { Router } from 'express';
import { obrasSocialesController } from '../controllers/obrasSocialesController';

class ObrasSocialesRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', obrasSocialesController.list);
        this.router.get('/:id', obrasSocialesController.getOne);
        this.router.post('/', obrasSocialesController.create);
        this.router.delete('/:id', obrasSocialesController.delete);
        this.router.put('/:id', obrasSocialesController.update);
    }

}

const obrasSocialesRoutes = new ObrasSocialesRoutes();
export default obrasSocialesRoutes.router;
