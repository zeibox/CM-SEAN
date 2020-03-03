"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const alumnosController_1 = require("../controllers/alumnosController");
class AlumnosRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', alumnosController_1.alumnosController.list);
        this.router.get('/:id', alumnosController_1.alumnosController.getOne);
        this.router.post('/', alumnosController_1.alumnosController.create);
        this.router.delete('/:id', alumnosController_1.alumnosController.delete);
        this.router.put('/:id', alumnosController_1.alumnosController.update);
    }
}
const alumnosRoutes = new AlumnosRoutes();
exports.default = alumnosRoutes.router;
