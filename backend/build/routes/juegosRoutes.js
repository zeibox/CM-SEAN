"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const juegosController_1 = require("../controllers/juegosController");
class JuegosRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', juegosController_1.juegosController.list);
        this.router.get('/:id', juegosController_1.juegosController.getOne);
        this.router.post('/', juegosController_1.juegosController.create);
        this.router.delete('/:id', juegosController_1.juegosController.delete);
        this.router.put('/:id', juegosController_1.juegosController.update);
    }
}
const juegosRoutes = new JuegosRoutes();
exports.default = juegosRoutes.router;
