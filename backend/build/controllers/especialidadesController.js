"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class EspecialidadesController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM v_especialidades');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM v_especialidades WHERE id_especialidad = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "La Especialidad no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO especialidades set ?', [req.body]);
        res.json({ message: 'Especialidad Registrada' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE especialidades set ? WHERE id_especialidad = ?', [req.body, id]);
        res.json({ message: "La Especialidad fue actualizada" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM v_especialidades WHERE id_especialidad = ?', [id]);
        res.json({ message: "La Especialidad fue eliminada" });
    }
}
exports.especialidadesController = new EspecialidadesController();
exports.default = exports.especialidadesController;
