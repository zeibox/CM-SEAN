"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const generosController_1 = require("../controllers/generosController");
class GenerosRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', generosController_1.generosController.list);
        this.router.get('/:id', generosController_1.generosController.getOne);
        this.router.post('/', generosController_1.generosController.create);
        this.router.delete('/:id', generosController_1.generosController.delete);
        this.router.put('/:id', generosController_1.generosController.update);
    }
}
const generosRoutes = new GenerosRoutes();
exports.default = generosRoutes.router;
