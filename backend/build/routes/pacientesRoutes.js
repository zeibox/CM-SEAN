"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pacientesController_1 = require("../controllers/pacientesController");
class PacientesRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', pacientesController_1.pacientesController.list);
        this.router.get('/:id', pacientesController_1.pacientesController.getOne);
        this.router.post('/', pacientesController_1.pacientesController.create);
        this.router.delete('/:id', pacientesController_1.pacientesController.delete);
        this.router.put('/:id', pacientesController_1.pacientesController.update);
    }
}
const pacientesRoutes = new PacientesRoutes();
exports.default = pacientesRoutes.router;
