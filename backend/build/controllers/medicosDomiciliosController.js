"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class MedicosDomiciliosController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM v_medicos_domicilios');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM v_medicos_domicilios WHERE id_medico = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato);
        }
        res.status(404).json({ text: "No registra domicilios" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO medicos_domicilios set ?', [req.body]);
        res.json({ message: 'Domicilio Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const { dom } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE medicos_domicilios set ? WHERE id_medico = ? and id_dom = ?', [req.body, id, dom]);
        res.json({ message: "EL domicilio fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        const { dom } = req.params;
        await database_1.default.query('DELETE FROM v_medicos_domicilios WHERE id_medico = ? and id_dom = ?', [id, dom]);
        res.json({ message: "El domicilio fue eliminado" });
    }
}
exports.medicosDomiciliosController = new MedicosDomiciliosController();
exports.default = exports.medicosDomiciliosController;
