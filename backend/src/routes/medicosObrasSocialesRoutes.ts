import { Router } from 'express';
import { medicosObrasSocialesController } from '../controllers/medicosObrasSocialesController';

class MedicosObrasSocialesRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', medicosObrasSocialesController.list);
        this.router.get('/:id', medicosObrasSocialesController.getOne);
        this.router.post('/', medicosObrasSocialesController.create);
        this.router.delete('/:id', medicosObrasSocialesController.delete);
        this.router.put('/:id', medicosObrasSocialesController.update);
    }

}

const medicosObrasSocialesRoutes = new MedicosObrasSocialesRoutes();
export default medicosObrasSocialesRoutes.router;
