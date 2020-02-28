"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class MantenimientosController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM v_mantenimientos');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM v_mantenimientos WHERE id = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Mantenimiento no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO mantenimientos set ?', [req.body]);
        res.json({ message: 'Mantenimiento Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE mantenimientos set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "EL Mantenimiento fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM v_mantenimientos WHERE id = ?', [id]);
        res.json({ message: "El Mantenimiento fue eliminado" });
    }
}
exports.mantenimientosController = new MantenimientosController();
exports.default = exports.mantenimientosController;
