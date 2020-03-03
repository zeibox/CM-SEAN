import { Request, Response } from 'express';
import bd from '../routes/database';

class ProvinciasController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM v_provincias');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM v_provincias WHERE id_provincia = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "Provincia inexiste" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO provincias set ?', [req.body]);
        res.json({ message: 'Provincia Registrada' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE provincias set ? WHERE id_provincia = ?', [req.body, id]);
        res.json({ message: "Provincia actualizada" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM v_provincias WHERE id_provincia = ?', [id]);
        res.json({ message: "Provincia eliminada" });
    }

}

export const provinciasController = new ProvinciasController();
export default provinciasController;