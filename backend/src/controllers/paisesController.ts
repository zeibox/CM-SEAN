import { Request, Response } from 'express';
import bd from '../routes/database';

class PaisesController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM v_paises');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM v_paises WHERE id_pais = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El País no existe" });
    }

    public async getbyName(req: Request, res: Response): Promise<any> {
        const { name } = req.params;
        const dateano = await bd.query('SELECT * FROM v_paises WHERE nombre = ?', [name]);
            return res.json(dateano);
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO paises set ?', [req.body]);
        res.json({ message: 'País Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE paises set ? WHERE id_pais = ?', [req.body, id]);
        res.json({ message: "EL País fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM v_paises WHERE id_pais = ?', [id]);
        res.json({ message: "El País fue eliminado" });
    }

}

export const paisesController = new PaisesController();
export default paisesController;