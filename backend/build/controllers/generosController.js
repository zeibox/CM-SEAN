"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class GenerosController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM v_generos');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM v_generos WHERE id_genero = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Género no existe" });
    }
    async create(req, res, err) {
        try {
            const result = await database_1.default.query('INSERT INTO generos set ?', [req.body]);
            res.json({ message: 'Género Registrado' });
        }
        catch (err) {
            res.json({ error: err.sqlMessage });
        }
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE generos set ? WHERE id_genero = ?', [req.body, id]);
        res.json({ message: "EL Género fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM v_generos WHERE id_genero = ?', [id]);
        res.json({ message: "El Género fue eliminado" });
    }
}
exports.generosController = new GenerosController();
exports.default = exports.generosController;
