"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class UsersController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM v_users');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM v_users WHERE id_user = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Usuario no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO users set ?', [req.body]);
        res.json({ message: 'Usuario Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE users set ? WHERE id_user = ?', [req.body, id]);
        res.json({ message: "EL Usuario fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM v_users WHERE id_user = ?', [id]);
        res.json({ message: "El Usuario fue eliminado" });
    }
}
exports.usersController = new UsersController();
exports.default = exports.usersController;
