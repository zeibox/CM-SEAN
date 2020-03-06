"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class AreasController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM v_areas');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM v_areas WHERE id_area = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "Area inexiste" });
    }
    async getbyName(req, res) {
        const { name } = req.params;
        const dateano = await database_1.default.query('SELECT * FROM v_areas WHERE nombre = ?', [name]);
        return res.json(dateano);
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO v_areas set ?', [req.body]);
        res.json({ message: 'Area Registrada' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE v_areas set ? WHERE id_area = ?', [req.body, id]);
        res.json({ message: "Area actualizada" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM v_areas WHERE id_area = ?', [id]);
        res.json({ message: "Area eliminada" });
    }
}
exports.areasController = new AreasController();
exports.default = exports.areasController;
