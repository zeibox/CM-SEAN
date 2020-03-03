"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class AlumnosController {
    async list(req, res) {
        const prod = await database_1.default.query('SELECT * FROM alumnos');
        res.json(prod);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const prod = await database_1.default.query('SELECT * FROM alumnos WHERE id_alumno = ?', [id]);
        // console.log(prod.length);
        if (prod.length > 0) {
            return res.json(prod[0]);
        }
        res.status(404).json({ text: "El Alumno no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO alumnos set ?', [req.body]);
        res.json({ message: 'Alumno Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE alumnos set ? WHERE id_alumno = ?', [req.body, id]);
        res.json({ message: "EL Alumno fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM alumnos WHERE id_alumno = ?', [id]);
        res.json({ message: "El Alumno fue eliminado" });
    }
}
exports.alumnosController = new AlumnosController();
exports.default = exports.alumnosController;
