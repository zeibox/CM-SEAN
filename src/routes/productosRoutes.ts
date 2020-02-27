import { Router } from 'express';
import { productosController } from '../controllers/productosController';

class ProductosRoutes {

    // Creamos una propiedad llamada: router y la inicializamos
    public router: Router = Router();

    // El constructor ejecutará un método llamado: config
    constructor() {
        this.config();
    }

    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config(): void {
        this.router.get('/', productosController.list);
        this.router.get('/:id', productosController.getOne);
        this.router.post('/', productosController.create);
        this.router.delete('/:id', productosController.delete);
        this.router.put('/:id', productosController.update);
    }

}

const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;
