import { Request, Response } from 'express';
import bd from '../routes/database';

class GenerosController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM v_generos');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM v_generos WHERE id_genero = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Género no existe" });
    }

    public async create(req: Request, res: Response, err: Error): Promise<void> {
        try{
            const result = await bd.query('INSERT INTO generos set ?', [req.body]);
            res.json({ message: 'Género Registrado' });
        }catch(err){
            res.json({ error: err.sqlMessage });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE generos set ? WHERE id_genero = ?', [req.body, id]);
        res.json({ message: "EL Género fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM v_generos WHERE id_genero = ?', [id]);
        res.json({ message: "El Género fue eliminado" });
    }

}

export const generosController = new GenerosController();
export default generosController;