import { Request, Response } from 'express';
import bd from '../routes/database';

class TurnosController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM v_turnos');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM v_turnos WHERE id_turno = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Turno no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO turnos set ?', [req.body]);
        res.json({ message: 'Turno Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE turnos set ? WHERE id_turno = ?', [req.body, id]);
        res.json({ message: "EL Turno fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM v_turnos WHERE id_turno = ?', [id]);
        res.json({ message: "El Turno fue eliminado" });
    }

}

export const turnosController = new TurnosController();
export default turnosController;