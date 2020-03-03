"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contactosController_1 = require("../controllers/contactosController");
class ContactosRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', contactosController_1.contactosController.list);
        this.router.get('/:id', contactosController_1.contactosController.getOne);
        this.router.post('/', contactosController_1.contactosController.create);
        this.router.delete('/:id', contactosController_1.contactosController.delete);
        this.router.put('/:id', contactosController_1.contactosController.update);
    }
}
const contactosRoutes = new ContactosRoutes();
exports.default = contactosRoutes.router;
