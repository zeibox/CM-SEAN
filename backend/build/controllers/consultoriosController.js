"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class ConsultoriosController {
    async list(req, res, err) {
        try {
            const dato = await database_1.default.query('SELECT * FROM v_consultorios');
            res.json(dato);
        }
        catch (err) {
            res.json({ error: err.sqlMessage });
        }
    }
    async getOne(req, res, err) {
        try {
            const { id } = req.params;
            const dato = await database_1.default.query('SELECT * FROM v_consultorios WHERE id_consultorio = ?', [id]);
            if (dato.length > 0) {
                return res.json(dato[0]);
            }
            res.status(404).json({ text: "El Consultorio no existe" });
        }
        catch (err) {
            res.json({ error: err.sqlMessage });
        }
    }
    async create(req, res, err) {
        try {
            const result = await database_1.default.query('INSERT INTO consultorios set ?', [req.body]);
            res.json({ message: 'Consultorio Registrado' });
        }
        catch (err) {
            res.json({ error: err.sqlMessage });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const oldProd = req.body;
            await database_1.default.query('UPDATE consultorios set ? WHERE id_consultorio = ?', [req.body, id]);
            res.json({ message: "EL Consultorio fue actualizado" });
        }
        catch (err) {
            res.json({ error: err.sqlMessage });
        }
    }
    async delete(req, res, err) {
        try {
            const { id } = req.params;
            await database_1.default.query('DELETE FROM v_consultorios WHERE id_consultorio = ?', [id]);
            res.json({ message: "El Consultorio fue eliminado" });
        }
        catch (err) {
            res.json({ error: err.sqlMessage });
        }
    }
}
exports.consultoriosController = new ConsultoriosController();
exports.default = exports.consultoriosController;
