"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const turnosController_1 = require("../controllers/turnosController");
class TurnosRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', turnosController_1.turnosController.list);
        this.router.get('/:id', turnosController_1.turnosController.getOne);
        this.router.post('/', turnosController_1.turnosController.create);
        this.router.delete('/:id', turnosController_1.turnosController.delete);
        this.router.put('/:id', turnosController_1.turnosController.update);
    }
}
const turnosRoutes = new TurnosRoutes();
exports.default = turnosRoutes.router;
