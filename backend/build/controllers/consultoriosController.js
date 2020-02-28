"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class ConsultoriosController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM v_consultorios');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM v_consultorios WHERE id_consultorio = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Consultorio no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO consultorios set ?', [req.body]);
        res.json({ message: 'Consultorio Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE consultorios set ? WHERE id_consultorio = ?', [req.body, id]);
        res.json({ message: "EL Consultorio fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM v_consultorios WHERE id_consultorio = ?', [id]);
        res.json({ message: "El Consultorio fue eliminado" });
    }
}
exports.consultoriosController = new ConsultoriosController();
exports.default = exports.consultoriosController;
