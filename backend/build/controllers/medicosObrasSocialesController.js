"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class MedicosObrasSocialesController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM medicos_obras_sociales');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM medicos_obras_sociales WHERE id_medico = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato);
        }
        res.status(404).json({ text: "No registra Obra Social o Prepaga" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO medicos_obras_sociales set ?', [req.body]);
        res.json({ message: 'Obra Social o Prepaga Registrada' });
    }
    async update(req, res) {
        const { id } = req.params;
        const { obra_social } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE medicos_obras_sociales set ? WHERE id_medico = ? and id_obras_social = ?', [req.body, id, obra_social]);
        res.json({ message: "Obra Social o Prepaga actualizada" });
    }
    async delete(req, res) {
        const { id } = req.params;
        const { obra_social } = req.params;
        await database_1.default.query('DELETE FROM medicos_obras_sociales WHERE id_medico = ? and id_obras_social = ?', [id, obra_social]);
        res.json({ message: "Obra Social o Prepaga eliminada" });
    }
}
exports.medicosObrasSocialesController = new MedicosObrasSocialesController();
exports.default = exports.medicosObrasSocialesController;
