"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class AreasHorariosController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM v_areas_horarios');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM v_areas_horarios WHERE id_area = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Horario no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO areas_horarios set ?', [req.body]);
        res.json({ message: 'Horario Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE areas_horarios set ? WHERE id_area = ?', [req.body, id]);
        res.json({ message: "Horario actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM v_areas_horarios WHERE id_area = ?', [id]);
        res.json({ message: "Horario eliminado" });
    }
}
exports.areasHorariosController = new AreasHorariosController();
exports.default = exports.areasHorariosController;
