"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class PaisesController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM paises');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM paises WHERE id_pais = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El País no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO paises set ?', [req.body]);
        res.json({ message: 'País Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE paises set ? WHERE id_pais = ?', [req.body, id]);
        res.json({ message: "EL País fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM paises WHERE id_pais = ?', [id]);
        res.json({ message: "El País fue eliminado" });
    }
}
exports.paisesController = new PaisesController();
exports.default = exports.paisesController;
