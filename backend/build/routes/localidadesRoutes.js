"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const localidadesController_1 = require("../controllers/localidadesController");
class LocalidadesRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', localidadesController_1.localidadesController.list);
        this.router.get('/:id', localidadesController_1.localidadesController.getOne);
        this.router.post('/', localidadesController_1.localidadesController.create);
        this.router.delete('/:id', localidadesController_1.localidadesController.delete);
        this.router.put('/:id', localidadesController_1.localidadesController.update);
    }
}
const localidadesRoutes = new LocalidadesRoutes();
exports.default = localidadesRoutes.router;
