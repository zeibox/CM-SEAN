"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jerarquiasController_1 = require("../controllers/jerarquiasController");
class JerarquiasRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', jerarquiasController_1.jerarquiasController.list);
        this.router.get('/:id', jerarquiasController_1.jerarquiasController.getOne);
        this.router.post('/', jerarquiasController_1.jerarquiasController.create);
        this.router.delete('/:id', jerarquiasController_1.jerarquiasController.delete);
        this.router.put('/:id', jerarquiasController_1.jerarquiasController.update);
    }
}
const jerarquiasRoutes = new JerarquiasRoutes();
exports.default = jerarquiasRoutes.router;
