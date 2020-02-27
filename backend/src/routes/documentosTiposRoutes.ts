import { Router } from 'express';
import { documentosTiposController } from '../controllers/documentosTiposController';

class DocumentosTiposRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', documentosTiposController.list);
        this.router.get('/:id', documentosTiposController.getOne);
        this.router.post('/', documentosTiposController.create);
        this.router.delete('/:id', documentosTiposController.delete);
        this.router.put('/:id', documentosTiposController.update);
    }

}

const documentosTiposRoutes = new DocumentosTiposRoutes();
export default documentosTiposRoutes.router;
