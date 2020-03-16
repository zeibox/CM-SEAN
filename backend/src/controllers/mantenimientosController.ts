import { Request, Response } from 'express';
import bd from '../routes/database';

class MantenimientosController {

    public async list(req: Request, res: Response): Promise<void> {
        try {
            const dato = await bd.query('SELECT * FROM v_control_panel order by grupo, nombre');
            res.json(dato);
        } catch (err) {
            res.json({ error: err.sqlMessage });
        }
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM v_control_panel WHERE id = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Mantenimiento no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO control_panel set ?', [req.body]);
        res.json({ message: 'Mantenimiento Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE control_panel set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "EL Mantenimiento fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM control_panel WHERE id = ?', [id]);
        res.json({ message: "El Mantenimiento fue eliminado" });
    }

}

export const mantenimientosController = new MantenimientosController();
export default mantenimientosController;