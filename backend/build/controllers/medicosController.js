"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class MedicosController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM v_medicos');
        res.json(dato);
    }
    async listHorarios(req, res) {
        const dato = await database_1.default.query('SELECT * FROM horarios');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM v_medicos_c WHERE id_medico = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Médico no existe" });
    }
    async create(req, res) {
        try {
            const result = await database_1.default.query('INSERT INTO v_medicos set ?', [req.body]);
            res.json({ message: 'Médico Registrado' });
        }
        catch (err) {
            res.json({ error: err.sqlMessage });
        }
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE medicos set ? WHERE id_medico = ?', [req.body, id]);
        res.json({ message: "EL Médico fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM v_medicos WHERE id_medico = ?', [id]);
        res.json({ message: "El Médico fue eliminado" });
    }
}
exports.medicosController = new MedicosController();
exports.default = exports.medicosController;
