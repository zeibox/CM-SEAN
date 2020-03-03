"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class ContactosController {
    async list(req, res) {
        const dato = await database_1.default.query('SELECT * FROM contactos');
        res.json(dato);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const dato = await database_1.default.query('SELECT * FROM contactos WHERE id = ?', [id]);
        // console.log(dato.length);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Contacto no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO contactos set ?', [req.body]);
        res.json({ message: 'Contacto Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE contactos set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "EL Contacto fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM contactos WHERE id = ?', [id]);
        res.json({ message: "El Contacto fue eliminado" });
    }
}
exports.contactosController = new ContactosController();
exports.default = exports.contactosController;
