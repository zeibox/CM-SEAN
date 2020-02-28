"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class MedicosEspecialidadesController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM v_medicos_especialidades');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM v_medicos_especialidades WHERE id_medico = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato);
        }
        res.status(404).json({ text: "No registra especialidades" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO medicos_especialidades set ?', [req.body]);
        res.json({ message: 'Especialidad Registrada' });
    }
    async update(req, res) {
        const { id } = req.params;
        const { especialidad } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE medicos_especialidades set ? WHERE id_medico = ? and id_especialidad = ?', [req.body, id, especialidad]);
        res.json({ message: "La especialidad fue actualizada" });
    }
    async delete(req, res) {
        const { id } = req.params;
        const { especialidad } = req.params;
        await database_1.default.query('DELETE FROM v_medicos_especialidades WHERE id_medico = ? and id_especialidad = ?', [id, especialidad]);
        res.json({ message: "La especialidad fue eliminada" });
    }
}
exports.medicosEspecialidadesController = new MedicosEspecialidadesController();
exports.default = exports.medicosEspecialidadesController;
