import { Request, Response } from 'express';
import bd from '../routes/database';

class PacientesController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM pacientes');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM pacientes WHERE id_paciente = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Paciente no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO pacientes set ?', [req.body]);
        res.json({ message: 'Paciente Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE pacientes set ? WHERE id_paciente = ?', [req.body, id]);
        res.json({ message: "EL Paciente fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM pacientes WHERE id_paciente = ?', [id]);
        res.json({ message: "El Paciente fue eliminado" });
    }

}

export const pacientesController = new PacientesController();
export default pacientesController;