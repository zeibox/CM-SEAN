"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const domiciliosController_1 = require("../controllers/domiciliosController");
class DomiciliosRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', domiciliosController_1.domiciliosController.list);
        this.router.get('/:id', domiciliosController_1.domiciliosController.getOne);
        this.router.post('/', domiciliosController_1.domiciliosController.create);
        this.router.delete('/:id', domiciliosController_1.domiciliosController.delete);
        this.router.put('/:id', domiciliosController_1.domiciliosController.update);
    }
}
const domiciliosRoutes = new DomiciliosRoutes();
exports.default = domiciliosRoutes.router;
