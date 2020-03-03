"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class ActorsController {
    async search(req, res) {
        const { cadena } = req.params;
        // console.log(cadena);
        const actor = await database_1.default.query("SELECT * FROM actores WHERE nombre LIKE '%" + [cadena] + "%' ORDER BY nombre");
        if (actor.length > 0) {
            return res.json(actor);
        }
        res.status(404).json({ text: "El Actor no existe" });
    }
    async list(req, res) {
        const actor = await database_1.default.query('SELECT * FROM actores ORDER BY nombre');
        res.json(actor);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const actor = await database_1.default.query('SELECT * FROM actores WHERE id = ?', [id]);
        // console.log(actor.length);
        if (actor.length > 0) {
            return res.json(actor[0]);
        }
        res.status(404).json({ text: "El Actor no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO actores set ?', [req.body]);
        res.json({ message: 'Actor Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE actores set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "EL Actor fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM actores WHERE id = ?', [id]);
        res.json({ message: "El Actor fue eliminado" });
    }
}
exports.actoresController = new ActorsController();
exports.default = exports.actoresController;
