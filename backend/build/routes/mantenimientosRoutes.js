"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mantenimientosController_1 = require("../controllers/mantenimientosController");
class MantenimientosRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', mantenimientosController_1.mantenimientosController.list);
        this.router.get('/:id', mantenimientosController_1.mantenimientosController.getOne);
        this.router.post('/', mantenimientosController_1.mantenimientosController.create);
        this.router.delete('/:id', mantenimientosController_1.mantenimientosController.delete);
        this.router.put('/:id', mantenimientosController_1.mantenimientosController.update);
    }
}
const mantenimientosRoutes = new MantenimientosRoutes();
exports.default = mantenimientosRoutes.router;
