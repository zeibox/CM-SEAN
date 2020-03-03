"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medicosObrasSocialesController_1 = require("../controllers/medicosObrasSocialesController");
class MedicosObrasSocialesRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', medicosObrasSocialesController_1.medicosObrasSocialesController.list);
        this.router.get('/:id', medicosObrasSocialesController_1.medicosObrasSocialesController.getOne);
        this.router.post('/', medicosObrasSocialesController_1.medicosObrasSocialesController.create);
        this.router.delete('/:id', medicosObrasSocialesController_1.medicosObrasSocialesController.delete);
        this.router.put('/:id', medicosObrasSocialesController_1.medicosObrasSocialesController.update);
    }
}
const medicosObrasSocialesRoutes = new MedicosObrasSocialesRoutes();
exports.default = medicosObrasSocialesRoutes.router;
