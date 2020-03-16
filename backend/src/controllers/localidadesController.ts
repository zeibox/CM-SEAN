import { Request, Response } from 'express';
import bd from '../routes/database';

class LocalidadesController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM v_locaProvPais order by provincia, nombre');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM v_locaProvPais WHERE id_localidad = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "La Loacalidad no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
           const result = await bd.query('INSERT INTO v_localidades set ?', [req.body]);
            res.json({ message: 'Loacalidad Registrada' }); 
        } catch (error) {
            res.json({ error: error.sqlMessage });
        }
        
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE localidades set ? WHERE id_localidad = ?', [req.body, id]);
        res.json({ message: "La Loacalidad fue actualizada" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM v_localidades WHERE id_localidad = ?', [id]);
        res.json({ message: "La Loacalidad fue eliminada" });
    }

}

export const localidadesController = new LocalidadesController();
export default localidadesController;