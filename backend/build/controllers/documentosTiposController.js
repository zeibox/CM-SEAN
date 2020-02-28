"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class DocumentosTiposController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM v_documentos_tipo');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM v_documentos_tipo WHERE id_documento_tipo = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El tipo de documento no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO documentos_tipo set ?', [req.body]);
        res.json({ message: 'tipo de documento Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE documentos_tipo set ? WHERE id_documento_tipo = ?', [req.body, id]);
        res.json({ message: "EL tipo de documento fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM v_documentos_tipo WHERE id_documento_tipo = ?', [id]);
        res.json({ message: "El tipo de documento fue eliminado" });
    }
}
exports.documentosTiposController = new DocumentosTiposController();
exports.default = exports.documentosTiposController;
