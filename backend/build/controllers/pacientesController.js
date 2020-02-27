"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class PacientesController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM pacientes');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM pacientes WHERE id_paciente = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Paciente no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO pacientes set ?', [req.body]);
        res.json({ message: 'Paciente Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE pacientes set ? WHERE id_paciente = ?', [req.body, id]);
        res.json({ message: "EL Paciente fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM pacientes WHERE id_paciente = ?', [id]);
        res.json({ message: "El Paciente fue eliminado" });
    }
}
exports.pacientesController = new PacientesController();
exports.default = exports.pacientesController;
