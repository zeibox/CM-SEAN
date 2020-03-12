"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class ProvinciasController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM v_provincias');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM v_provincias WHERE id_provincia = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "Provincia inexiste" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO provincias set ?', [req.body]);
        res.json({ message: 'Provincia Registrada' });
    }
    async update(req, res) {
        const { id } = req.params;
        console.log(req.body);
        const oldProd = req.body;
        await database_1.default.query('UPDATE provincias set ? WHERE id_provincia = ?', [req.body, id]);
        res.json({ message: "Provincia actualizada" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM provincias WHERE id_provincia = ?', [id]);
        res.json({ message: "Provincia eliminada" });
    }
}
exports.provinciasController = new ProvinciasController();
exports.default = exports.provinciasController;
