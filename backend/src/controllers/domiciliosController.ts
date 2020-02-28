import { Request, Response } from 'express';
import bd from '../routes/database';

class DomiciliosController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM v_domicilios');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM v_domicilios WHERE id_dom = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Domicilio no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO domicilios set ?', [req.body]);
        res.json({ message: 'Domicilio Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE domicilios set ? WHERE id_dom = ?', [req.body, id]);
        res.json({ message: "EL Domicilio fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM v_domicilios WHERE id_dom = ?', [id]);
        res.json({ message: "El Domicilio fue eliminado" });
    }

}

export const domiciliosController = new DomiciliosController();
export default domiciliosController;