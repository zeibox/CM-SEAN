import { Request, Response } from 'express';
import bd from '../routes/database';

class ConsultoriosController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM consultorios');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM consultorios WHERE id_consultorio = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Consultorio no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO consultorios set ?', [req.body]);
        res.json({ message: 'Consultorio Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE consultorios set ? WHERE id_consultorio = ?', [req.body, id]);
        res.json({ message: "EL Consultorio fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM consultorios WHERE id_consultorio = ?', [id]);
        res.json({ message: "El Consultorio fue eliminado" });
    }

}

export const consultoriosController = new ConsultoriosController();
export default consultoriosController;