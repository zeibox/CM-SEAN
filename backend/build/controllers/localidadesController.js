"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class LocalidadesController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM v_localidades');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM v_localidades WHERE id_localidad = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "La Loacalidad no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO localidades set ?', [req.body]);
        res.json({ message: 'Loacalidad Registrada' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE localidades set ? WHERE id_localidad = ?', [req.body, id]);
        res.json({ message: "La Loacalidad fue actualizada" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM v_localidades WHERE id_localidad = ?', [id]);
        res.json({ message: "La Loacalidad fue eliminada" });
    }
}
exports.localidadesController = new LocalidadesController();
exports.default = exports.localidadesController;
