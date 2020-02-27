import { Request, Response } from 'express';
import bd from '../routes/database';

class MedicosObrasSocialesController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM medicos_obras_sociales');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM medicos_obras_sociales WHERE id_medico = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato);
        }
        res.status(404).json({ text: "No registra Obra Social o Prepaga" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO medicos_obras_sociales set ?', [req.body]);
        res.json({ message: 'Obra Social o Prepaga Registrada' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { obra_social } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE medicos_obras_sociales set ? WHERE id_medico = ? and id_obras_social = ?', [req.body, id, obra_social]);
        res.json({ message: "Obra Social o Prepaga actualizada" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const { obra_social } = req.params;
        await bd.query('DELETE FROM medicos_obras_sociales WHERE id_medico = ? and id_obras_social = ?', [id, obra_social]);
        res.json({ message: "Obra Social o Prepaga eliminada" });
    }

}

export const medicosObrasSocialesController = new MedicosObrasSocialesController();
export default medicosObrasSocialesController;