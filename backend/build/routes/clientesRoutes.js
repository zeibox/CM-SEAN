"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientesController_1 = require("../controllers/clientesController");
class ClientesRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', clientesController_1.clientesController.list);
        this.router.get('/:id', clientesController_1.clientesController.getOne);
        this.router.post('/', clientesController_1.clientesController.create);
        this.router.delete('/:id', clientesController_1.clientesController.delete);
        this.router.put('/:id', clientesController_1.clientesController.update);
    }
}
const clientesRoutes = new ClientesRoutes();
exports.default = clientesRoutes.router;
