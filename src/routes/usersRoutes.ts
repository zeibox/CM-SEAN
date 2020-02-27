import { Router } from 'express';
import { usersController } from '../controllers/usersController';

class UsuariosRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', usersController.list);
        this.router.get('/:id', usersController.getOne);
        this.router.post('/', usersController.create);
        this.router.delete('/:id', usersController.delete);
        this.router.put('/:id', usersController.update);
    }

}

const usersRoutes = new UsuariosRoutes();
export default usersRoutes.router;
