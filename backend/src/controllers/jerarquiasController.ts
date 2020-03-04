import { Request, Response } from 'express';
import bd from '../routes/database';

class JerarquiasController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM v_jerarquias');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM v_jerarquias WHERE id_jerarquia = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "Jerarquía inexiste" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO v_jerarquias set ?', [req.body]);
        res.json({ message: 'Jerarquía Registrada' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE v_jerarquias set ? WHERE id_jerarquia = ?', [req.body, id]);
        res.json({ message: "Jerarquía actualizada" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM v_jerarquias WHERE id_jerarquia = ?', [id]);
        res.json({ message: "Jerarquía eliminada" });
    }

}

export const jerarquiasController = new JerarquiasController();
export default jerarquiasController;