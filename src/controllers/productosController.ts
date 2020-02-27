import { Request, Response } from 'express';
import bd from '../routes/database';

class ProductosController {

    public async list(req: Request, res: Response): Promise<void> {
        const prod = await bd.query('SELECT * FROM productos');
        res.json(prod);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const prod = await bd.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
        // console.log(prod.length);
        if (prod.length > 0) {
            return res.json(prod[0]);
        }
        res.status(404).json({ text: "El Producto no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO productos set ?', [req.body]);
        res.json({ message: 'Producto Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE productos set ? WHERE id_producto = ?', [req.body, id]);
        res.json({ message: "EL Producto fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM productos WHERE id_producto = ?', [id]);
        res.json({ message: "El Producto fue eliminado" });
    }

}

export const productosController = new ProductosController();
export default productosController;