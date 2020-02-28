"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class JerarquiasController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM v_jerarquias');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM v_jerarquias WHERE id_jerarquia = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "Jerarquía inexiste" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO jerarquias set ?', [req.body]);
        res.json({ message: 'Jerarquía Registrada' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE jerarquias set ? WHERE id_jerarquia = ?', [req.body, id]);
        res.json({ message: "Jerarquía actualizada" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM v_jerarquias WHERE id_jerarquia = ?', [id]);
        res.json({ message: "Jerarquía eliminada" });
    }
}
exports.jerarquiasController = new JerarquiasController();
exports.default = exports.jerarquiasController;
