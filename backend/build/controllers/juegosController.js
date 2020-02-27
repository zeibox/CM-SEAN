"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class JuegosController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM juegos');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM juegos WHERE id = ?', [id]);
        console.log(dato.length);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El juego no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO juegos set ?', [req.body]);
        res.json({ message: 'juego Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const olddato = req.body;
        await database_1.default.query('UPDATE juegos set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "EL juego fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM juegos WHERE id = ?', [id]);
        res.json({ message: "El juego fue eliminado" });
    }
}
exports.juegosController = new JuegosController();
exports.default = exports.juegosController;
