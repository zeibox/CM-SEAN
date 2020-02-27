"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usersController_1 = require("../controllers/usersController");
class UsuariosRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', usersController_1.usersController.list);
        this.router.get('/:id', usersController_1.usersController.getOne);
        this.router.post('/', usersController_1.usersController.create);
        this.router.delete('/:id', usersController_1.usersController.delete);
        this.router.put('/:id', usersController_1.usersController.update);
    }
}
const usersRoutes = new UsuariosRoutes();
exports.default = usersRoutes.router;
