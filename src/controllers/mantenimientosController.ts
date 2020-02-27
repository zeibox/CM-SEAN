import { Request, Response } from 'express';
import bd from '../routes/database';

class MantenimientosController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM mantenimientos');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM mantenimientos WHERE id = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Mantenimiento no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO mantenimientos set ?', [req.body]);
        res.json({ message: 'Mantenimiento Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE mantenimientos set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "EL Mantenimiento fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM mantenimientos WHERE id = ?', [id]);
        res.json({ message: "El Mantenimiento fue eliminado" });
    }

}

export const mantenimientosController = new MantenimientosController();
export default mantenimientosController;