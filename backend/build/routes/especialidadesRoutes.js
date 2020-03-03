"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const especialidadesController_1 = require("../controllers/especialidadesController");
class EspecialidadesRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', especialidadesController_1.especialidadesController.list);
        this.router.get('/:id', especialidadesController_1.especialidadesController.getOne);
        this.router.post('/', especialidadesController_1.especialidadesController.create);
        this.router.delete('/:id', especialidadesController_1.especialidadesController.delete);
        this.router.put('/:id', especialidadesController_1.especialidadesController.update);
    }
}
const especialidadesRoutes = new EspecialidadesRoutes();
exports.default = especialidadesRoutes.router;
