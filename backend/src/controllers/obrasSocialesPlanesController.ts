import { Request, Response } from 'express';
import bd from '../routes/database';

class ObrasSocialesPlanesController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM obras_sociales_planes');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM obras_sociales_planes WHERE id_osp = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato);
        }
        res.status(404).json({ text: "El Plan no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO obras_sociales_planes set ?', [req.body]);
        res.json({ message: 'Plan Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE obras_sociales_planes set ? WHERE id_osp = ?', [req.body, id]);
        res.json({ message: "El Plan fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM obras_sociales_planes WHERE id_osp = ?', [id]);
        res.json({ message: "El Plan fue eliminado" });
    }

}

export const obrasSocialesPlanesController = new ObrasSocialesPlanesController();
export default obrasSocialesPlanesController;