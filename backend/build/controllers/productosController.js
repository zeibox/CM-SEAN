"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../routes/database"));
class ProductosController {
    async list(req, res) {
        const prod = await database_1.default.query('SELECT * FROM productos');
        res.json(prod);
    }
    async getOne(req, res) {
        const { id } = req.params;
        const prod = await database_1.default.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
        // console.log(prod.length);
        if (prod.length > 0) {
            return res.json(prod[0]);
        }
        res.status(404).json({ text: "El Producto no existe" });
    }
    async create(req, res) {
        const result = await database_1.default.query('INSERT INTO productos set ?', [req.body]);
        res.json({ message: 'Producto Registrado' });
    }
    async update(req, res) {
        const { id } = req.params;
        const oldProd = req.body;
        await database_1.default.query('UPDATE productos set ? WHERE id_producto = ?', [req.body, id]);
        res.json({ message: "EL Producto fue actualizado" });
    }
    async delete(req, res) {
        const { id } = req.params;
        await database_1.default.query('DELETE FROM productos WHERE id_producto = ?', [id]);
        res.json({ message: "El Producto fue eliminado" });
    }
}
exports.productosController = new ProductosController();
exports.default = exports.productosController;
