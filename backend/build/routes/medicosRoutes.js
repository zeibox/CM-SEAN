"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medicosController_1 = require("../controllers/medicosController");
class MedicosRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', medicosController_1.medicosController.list);
        this.router.get('/:id', medicosController_1.medicosController.getOne);
        this.router.post('/', medicosController_1.medicosController.create);
        this.router.delete('/:id', medicosController_1.medicosController.delete);
        this.router.put('/:id', medicosController_1.medicosController.update);
    }
}
const medicosRoutes = new MedicosRoutes();
exports.default = medicosRoutes.router;
