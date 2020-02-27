"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class ObrasSocialesController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM obras_sociales');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM obras_sociales WHERE id_obra_social = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "La Obras Social o Prepaga no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO obras_sociales set ?', [req.body]);
        res.json({ message: 'Obras Social o Prepaga Registrada' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE obras_sociales set ? WHERE id_obra_social = ?', [req.body, id]);
        res.json({ message: "La Obras Social o Prepaga fue actualizada" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM obras_sociales WHERE id_obra_social = ?', [id]);
        res.json({ message: "La Obras Social o Prepaga fue eliminada" });
    }
}
exports.obrasSocialesController = new ObrasSocialesController();
exports.default = exports.obrasSocialesController;
