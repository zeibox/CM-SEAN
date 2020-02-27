"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const provinciasController_1 = require("../controllers/provinciasController");
class ProvinciasRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', provinciasController_1.provinciasController.list);
        this.router.get('/:id', provinciasController_1.provinciasController.getOne);
        this.router.post('/', provinciasController_1.provinciasController.create);
        this.router.delete('/:id', provinciasController_1.provinciasController.delete);
        this.router.put('/:id', provinciasController_1.provinciasController.update);
    }
}
const provinciasRoutes = new ProvinciasRoutes();
exports.default = provinciasRoutes.router;
