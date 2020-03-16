"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const areasController_1 = require("../controllers/areasController");
class AreasRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', areasController_1.areasController.list);
        this.router.get('/:id', areasController_1.areasController.getOne);
        this.router.get('/byname/:name', areasController_1.areasController.getbyName);
        this.router.post('/', areasController_1.areasController.create);
        this.router.delete('/:id', areasController_1.areasController.delete);
        this.router.put('/:id', areasController_1.areasController.update);
    }
}
const areasRoutes = new AreasRoutes();
exports.default = areasRoutes.router;
