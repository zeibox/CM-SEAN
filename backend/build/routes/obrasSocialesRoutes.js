"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const obrasSocialesController_1 = require("../controllers/obrasSocialesController");
class ObrasSocialesRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', obrasSocialesController_1.obrasSocialesController.list);
        this.router.get('/:id', obrasSocialesController_1.obrasSocialesController.getOne);
        this.router.post('/', obrasSocialesController_1.obrasSocialesController.create);
        this.router.delete('/:id', obrasSocialesController_1.obrasSocialesController.delete);
        this.router.put('/:id', obrasSocialesController_1.obrasSocialesController.update);
    }
}
const obrasSocialesRoutes = new ObrasSocialesRoutes();
exports.default = obrasSocialesRoutes.router;
