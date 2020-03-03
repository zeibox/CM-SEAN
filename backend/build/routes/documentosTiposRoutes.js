"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const documentosTiposController_1 = require("../controllers/documentosTiposController");
class DocumentosTiposRoutes {
    // El constructor ejecutará un método llamado: config
    constructor() {
        // Creamos una propiedad llamada: router y la inicializamos
        this.router = express_1.Router();
        this.config();
    }
    // Config utiliza la propiedad router y a partir de ella definiremos las rutas
    config() {
        this.router.get('/', documentosTiposController_1.documentosTiposController.list);
        this.router.get('/:id', documentosTiposController_1.documentosTiposController.getOne);
        this.router.post('/', documentosTiposController_1.documentosTiposController.create);
        this.router.delete('/:id', documentosTiposController_1.documentosTiposController.delete);
        this.router.put('/:id', documentosTiposController_1.documentosTiposController.update);
    }
}
const documentosTiposRoutes = new DocumentosTiposRoutes();
exports.default = documentosTiposRoutes.router;
