import { Request, Response } from 'express';
import bd from '../routes/database';

class AreasController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM v_areas');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM v_areas WHERE id_area = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "Area inexiste" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO v_areas set ?', [req.body]);
        res.json({ message: 'Area Registrada' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE v_areas set ? WHERE id_area = ?', [req.body, id]);
        res.json({ message: "Area actualizada" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM v_areas WHERE id_area = ?', [id]);
        res.json({ message: "Area eliminada" });
    }

}

export const areasController = new AreasController();
export default areasController;