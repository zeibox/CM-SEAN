import { Request, Response } from 'express';
import bd from '../routes/database';

class ActorsController {
    public async search(req: Request, res: Response): Promise<any> {
        const { cadena } = req.params;
        // console.log(cadena);
        const actor = await bd.query("SELECT * FROM actores WHERE nombre LIKE '%"+ [cadena] +"%' ORDER BY nombre");
        if (actor.length > 0) {
            return res.json(actor);
        }
        res.status(404).json({ text: "El Actor no existe" });
    }

    public async list(req: Request, res: Response): Promise<void> {
        const actor = await bd.query('SELECT * FROM actores ORDER BY nombre');
        res.json(actor);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const actor = await bd.query('SELECT * FROM actores WHERE id = ?', [id]);
        // console.log(actor.length);
        if (actor.length > 0) {
            return res.json(actor[0]);
        }
        res.status(404).json({ text: "El Actor no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO actores set ?', [req.body]);
        res.json({ message: 'Actor Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE actores set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "EL Actor fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM actores WHERE id = ?', [id]);
        res.json({ message: "El Actor fue eliminado" });
    }

}

export const actoresController = new ActorsController();
export default actoresController;