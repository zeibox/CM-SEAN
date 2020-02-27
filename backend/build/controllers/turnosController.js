"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class TurnosController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM turnos');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM turnos WHERE id_turno = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Turno no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO turnos set ?', [req.body]);
        res.json({ message: 'Turno Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE turnos set ? WHERE id_turno = ?', [req.body, id]);
        res.json({ message: "EL Turno fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM turnos WHERE id_turno = ?', [id]);
        res.json({ message: "El Turno fue eliminado" });
    }
}
exports.turnosController = new TurnosController();
exports.default = exports.turnosController;
