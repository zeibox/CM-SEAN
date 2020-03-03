"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class ObrasSocialesPlanesController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM v_obras_sociales_planes');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM v_obras_sociales_planes WHERE id_osp = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato);
        }
        res.status(404).json({ text: "El Plan no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO obras_sociales_planes set ?', [req.body]);
        res.json({ message: 'Plan Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE obras_sociales_planes set ? WHERE id_osp = ?', [req.body, id]);
        res.json({ message: "El Plan fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM v_obras_sociales_planes WHERE id_osp = ?', [id]);
        res.json({ message: "El Plan fue eliminado" });
    }
}
exports.obrasSocialesPlanesController = new ObrasSocialesPlanesController();
exports.default = exports.obrasSocialesPlanesController;
