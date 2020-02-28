import { Request, Response } from 'express';
import bd from '../routes/database';

class ObrasSocialesController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM v_obras_sociales');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM v_obras_sociales WHERE id_obra_social = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "La Obras Social o Prepaga no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO obras_sociales set ?', [req.body]);
        res.json({ message: 'Obras Social o Prepaga Registrada' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE obras_sociales set ? WHERE id_obra_social = ?', [req.body, id]);
        res.json({ message: "La Obras Social o Prepaga fue actualizada" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM v_obras_sociales WHERE id_obra_social = ?', [id]);
        res.json({ message: "La Obras Social o Prepaga fue eliminada" });
    }

}

export const obrasSocialesController = new ObrasSocialesController();
export default obrasSocialesController;