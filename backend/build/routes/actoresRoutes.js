"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const actoresController_1 = require("../controllers/actoresController");
class ActoresRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/search/:cadena', actoresController_1.actoresController.search);
        this.router.get('/', actoresController_1.actoresController.list);
        this.router.get('/:id', actoresController_1.actoresController.getOne);
        this.router.post('/', actoresController_1.actoresController.create);
        this.router.delete('/:id', actoresController_1.actoresController.delete);
        this.router.put('/:id', actoresController_1.actoresController.update);
    }
}
const actoresRoutes = new ActoresRoutes();
exports.default = actoresRoutes.router;
