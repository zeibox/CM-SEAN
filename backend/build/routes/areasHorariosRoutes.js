"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const areasHorariosController_1 = require("../controllers/areasHorariosController");
class AreasHorariosRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', areasHorariosController_1.areasHorariosController.list);
        this.router.get('/:id', areasHorariosController_1.areasHorariosController.getOne);
        this.router.post('/', areasHorariosController_1.areasHorariosController.create);
        this.router.delete('/:id', areasHorariosController_1.areasHorariosController.delete);
        this.router.put('/:id', areasHorariosController_1.areasHorariosController.update);
    }
}
const areasHorariosRoutes = new AreasHorariosRoutes();
exports.default = areasHorariosRoutes.router;
