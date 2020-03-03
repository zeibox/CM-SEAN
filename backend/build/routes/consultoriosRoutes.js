"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const consultoriosController_1 = require("../controllers/consultoriosController");
class ConsultoriosRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', consultoriosController_1.consultoriosController.list);
        this.router.get('/:id', consultoriosController_1.consultoriosController.getOne);
        this.router.post('/', consultoriosController_1.consultoriosController.create);
        this.router.delete('/:id', consultoriosController_1.consultoriosController.delete);
        this.router.put('/:id', consultoriosController_1.consultoriosController.update);
    }
}
const consultoriosRoutes = new ConsultoriosRoutes();
exports.default = consultoriosRoutes.router;
