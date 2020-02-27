import { Router } from 'express';
import { contactosController } from '../controllers/contactosController';

class ContactosRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', contactosController.list);
        this.router.get('/:id', contactosController.getOne);
        this.router.post('/', contactosController.create);
        this.router.delete('/:id', contactosController.delete);
        this.router.put('/:id', contactosController.update);
    }

}

const contactosRoutes = new ContactosRoutes();
export default contactosRoutes.router;
