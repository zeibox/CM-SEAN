"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medicosDomiciliosController_1 = require("../controllers/medicosDomiciliosController");
class MedicosDomiciliosRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', medicosDomiciliosController_1.medicosDomiciliosController.list);
        this.router.get('/:id', medicosDomiciliosController_1.medicosDomiciliosController.getOne);
        this.router.post('/', medicosDomiciliosController_1.medicosDomiciliosController.create);
        this.router.delete('/:id', medicosDomiciliosController_1.medicosDomiciliosController.delete);
        this.router.put('/:id', medicosDomiciliosController_1.medicosDomiciliosController.update);
    }
}
const medicosDomiciliosRoutes = new MedicosDomiciliosRoutes();
exports.default = medicosDomiciliosRoutes.router;
