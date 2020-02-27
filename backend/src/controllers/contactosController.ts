import { Request, Response } from 'express';
import bd from '../routes/database';

class ContactosController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM contactos');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM contactos WHERE id = ?', [id]);
        // console.log(dato.length);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Contacto no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO contactos set ?', [req.body]);
        res.json({ message: 'Contacto Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE contactos set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "EL Contacto fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM contactos WHERE id = ?', [id]);
        res.json({ message: "El Contacto fue eliminado" });
    }

}

export const contactosController = new ContactosController();
export default contactosController;