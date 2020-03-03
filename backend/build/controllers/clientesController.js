"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class ClientesController {
    async list(req, res) {
        const clie = await database_1.default.query('SELECT * FROM clientes');
        res.json(clie);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const clie = await database_1.default.query('SELECT * FROM clientes WHERE id_cliente = ?', [id]);
        console.log(clie.length);
        if (clie.length > 0) {
            return res.json(clie[0]);
        }
        res.status(404).json({ text: "El Cliente no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO clientes set ?', [req.body]);
        res.json({ message: 'Cliente Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldClie = req.body;
        await database_1.default.query('UPDATE clientes set ? WHERE id_cliente = ?', [req.body, id]);
        res.json({ message: "EL Cliente fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM clientes WHERE id_cliente = ?', [id]);
        res.json({ message: "El cliente fue eliminado" });
    }
}
exports.clientesController = new ClientesController();
exports.default = exports.clientesController;
