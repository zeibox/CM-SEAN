"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const paisesController_1 = require("../controllers/paisesController");
class PaisesRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', paisesController_1.paisesController.list);
        this.router.get('/:id', paisesController_1.paisesController.getOne);
        this.router.post('/', paisesController_1.paisesController.create);
        this.router.delete('/:id', paisesController_1.paisesController.delete);
        this.router.put('/:id', paisesController_1.paisesController.update);
    }
}
const paisesRoutes = new PaisesRoutes();
exports.default = paisesRoutes.router;
