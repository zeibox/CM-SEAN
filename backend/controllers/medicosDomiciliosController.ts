import { Request, Response } from 'express';
import bd from '../routes/database';

class MedicosDomiciliosController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM medicos_domicilios');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM medicos_domicilios WHERE id_medico = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato);
        }
        res.status(404).json({ text: "No registra domicilios" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO medicos_domicilios set ?', [req.body]);
        res.json({ message: 'Domicilio Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { dom } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE medicos_domicilios set ? WHERE id_medico = ? and id_dom = ?', [req.body, id, dom]);
        res.json({ message: "EL domicilio fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { dom } = req.params;
        await bd.query('DELETE FROM medicos_domicilios WHERE id_medico = ? and id_dom = ?', [id, dom]);
        res.json({ message: "El domicilio fue eliminado" });
    }

}

export const medicosDomiciliosController = new MedicosDomiciliosController();
export default medicosDomiciliosController;