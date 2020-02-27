import { Request, Response } from 'express';
import bd from '../routes/database';

class UsersController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM users');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM users WHERE id_user = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Usuario no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO users set ?', [req.body]);
        res.json({ message: 'Usuario Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE users set ? WHERE id_user = ?', [req.body, id]);
        res.json({ message: "EL Usuario fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM users WHERE id_user = ?', [id]);
        res.json({ message: "El Usuario fue eliminado" });
    }

}

export const usersController = new UsersController();
export default usersController;