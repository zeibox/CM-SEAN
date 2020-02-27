import { Router } from 'express';
import { alumnosController } from '../controllers/alumnosController';

class AlumnosRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', alumnosController.list);
        this.router.get('/:id', alumnosController.getOne);
        this.router.post('/', alumnosController.create);
        this.router.delete('/:id', alumnosController.delete);
        this.router.put('/:id', alumnosController.update);
    }

}

const alumnosRoutes = new AlumnosRoutes();
export default alumnosRoutes.router;
