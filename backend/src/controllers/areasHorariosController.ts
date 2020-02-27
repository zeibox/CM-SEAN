import { Request, Response } from 'express';
import bd from '../routes/database';

class AreasHorariosController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM areas_horarios');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM areas_horarios WHERE id_area = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Horario no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO areas_horarios set ?', [req.body]);
        res.json({ message: 'Horario Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE areas_horarios set ? WHERE id_area = ?', [req.body, id]);
        res.json({ message: "Horario actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM areas_horarios WHERE id_area = ?', [id]);
        res.json({ message: "Horario eliminado" });
    }

}

export const areasHorariosController = new AreasHorariosController();
export default areasHorariosController;