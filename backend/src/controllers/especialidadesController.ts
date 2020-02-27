import { Request, Response } from 'express';
import bd from '../routes/database';

class EspecialidadesController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM especialidades');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM especialidades WHERE id_especialidad = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "La Especialidad no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO especialidades set ?', [req.body]);
        res.json({ message: 'Especialidad Registrada' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE especialidades set ? WHERE id_especialidad = ?', [req.body, id]);
        res.json({ message: "La Especialidad fue actualizada" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM especialidades WHERE id_especialidad = ?', [id]);
        res.json({ message: "La Especialidad fue eliminada" });
    }

}

export const especialidadesController = new EspecialidadesController();
export default especialidadesController;