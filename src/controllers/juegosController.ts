import { Request, Response } from 'express';
import bd from '../routes/database';

class JuegosController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM juegos');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM juegos WHERE id = ?', [id]);
        console.log(dato.length);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El juego no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO juegos set ?', [req.body]);
        res.json({ message: 'juego Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const olddato = req.body;
        await bd.query('UPDATE juegos set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "EL juego fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM juegos WHERE id = ?', [id]);
        res.json({ message: "El juego fue eliminado" });
    }

}

export const juegosController = new JuegosController();
export default juegosController;