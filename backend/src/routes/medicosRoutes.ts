import { Router } from 'express';
import { medicosController } from '../controllers/medicosController';

class MedicosRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/horarios', medicosController.listHorarios);
        this.router.get('/', medicosController.list);
        this.router.get('/:id', medicosController.getOne);
        this.router.post('/', medicosController.create);
        this.router.delete('/:id', medicosController.delete);
        this.router.put('/:id', medicosController.update);
    }

}

const medicosRoutes = new MedicosRoutes();
export default medicosRoutes.router;
