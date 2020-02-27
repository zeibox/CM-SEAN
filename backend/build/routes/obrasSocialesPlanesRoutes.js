"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const obrasSocialesPlanesController_1 = require("../controllers/obrasSocialesPlanesController");
class ObrasSocialesPlanesRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', obrasSocialesPlanesController_1.obrasSocialesPlanesController.list);
        this.router.get('/:id', obrasSocialesPlanesController_1.obrasSocialesPlanesController.getOne);
        this.router.post('/', obrasSocialesPlanesController_1.obrasSocialesPlanesController.create);
        this.router.delete('/:id', obrasSocialesPlanesController_1.obrasSocialesPlanesController.delete);
        this.router.put('/:id', obrasSocialesPlanesController_1.obrasSocialesPlanesController.update);
    }
}
const obrasSocialesPlanesRoutes = new ObrasSocialesPlanesRoutes();
exports.default = obrasSocialesPlanesRoutes.router;
