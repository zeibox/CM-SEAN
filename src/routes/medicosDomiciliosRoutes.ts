import { Router } from 'express';
import { medicosDomiciliosController } from '../controllers/medicosDomiciliosController';

class MedicosDomiciliosRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', medicosDomiciliosController.list);
        this.router.get('/:id', medicosDomiciliosController.getOne);
        this.router.post('/', medicosDomiciliosController.create);
        this.router.delete('/:id', medicosDomiciliosController.delete);
        this.router.put('/:id', medicosDomiciliosController.update);
    }

}

const medicosDomiciliosRoutes = new MedicosDomiciliosRoutes();
export default medicosDomiciliosRoutes.router;
