import { Router } from 'express';
import { obrasSocialesPlanesController } from '../controllers/obrasSocialesPlanesController';

class ObrasSocialesPlanesRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', obrasSocialesPlanesController.list);
        this.router.get('/:id', obrasSocialesPlanesController.getOne);
        this.router.post('/', obrasSocialesPlanesController.create);
        this.router.delete('/:id', obrasSocialesPlanesController.delete);
        this.router.put('/:id', obrasSocialesPlanesController.update);
    }

}

const obrasSocialesPlanesRoutes = new ObrasSocialesPlanesRoutes();
export default obrasSocialesPlanesRoutes.router;
