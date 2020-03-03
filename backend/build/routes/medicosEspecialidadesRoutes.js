"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medicosEspecialidadesController_1 = require("../controllers/medicosEspecialidadesController");
class MedicosEspecialidadesRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', medicosEspecialidadesController_1.medicosEspecialidadesController.list);
        this.router.get('/:id', medicosEspecialidadesController_1.medicosEspecialidadesController.getOne);
        this.router.post('/', medicosEspecialidadesController_1.medicosEspecialidadesController.create);
        this.router.delete('/:id', medicosEspecialidadesController_1.medicosEspecialidadesController.delete);
        this.router.put('/:id', medicosEspecialidadesController_1.medicosEspecialidadesController.update);
    }
}
const medicosEspecialidadesRoutes = new MedicosEspecialidadesRoutes();
exports.default = medicosEspecialidadesRoutes.router;
