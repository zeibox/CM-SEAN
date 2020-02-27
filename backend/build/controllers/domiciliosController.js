"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class DomiciliosController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM domicilios');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM domicilios WHERE id_dom = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Domicilio no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO domicilios set ?', [req.body]);
        res.json({ message: 'Domicilio Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE domicilios set ? WHERE id_dom = ?', [req.body, id]);
        res.json({ message: "EL Domicilio fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM domicilios WHERE id_dom = ?', [id]);
        res.json({ message: "El Domicilio fue eliminado" });
    }
}
exports.domiciliosController = new DomiciliosController();
exports.default = exports.domiciliosController;
