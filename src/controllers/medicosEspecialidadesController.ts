import { Request, Response } from 'express';
import bd from '../routes/database';

class MedicosEspecialidadesController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM medicos_especialidades');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM medicos_especialidades WHERE id_medico = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato);
        }
        res.status(404).json({ text: "No registra especialidades" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO medicos_especialidades set ?', [req.body]);
        res.json({ message: 'Especialidad Registrada' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { especialidad } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE medicos_especialidades set ? WHERE id_medico = ? and id_especialidad = ?', [req.body, id, especialidad]);
        res.json({ message: "La especialidad fue actualizada" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { especialidad } = req.params;
        await bd.query('DELETE FROM medicos_especialidades WHERE id_medico = ? and id_especialidad = ?', [id, especialidad]);
        res.json({ message: "La especialidad fue eliminada" });
    }

}

export const medicosEspecialidadesController = new MedicosEspecialidadesController();
export default medicosEspecialidadesController;