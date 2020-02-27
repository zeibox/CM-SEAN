import { Request, Response } from 'express';
import bd from '../routes/database';

class ClientesController {

    public async list(req: Request, res: Response): Promise<void> {
        const clie = await bd.query('SELECT * FROM clientes');
        res.json(clie);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const clie = await bd.query('SELECT * FROM clientes WHERE id_cliente = ?', [id]);
        console.log(clie.length);
        if (clie.length > 0) {
            return res.json(clie[0]);
        }
        res.status(404).json({ text: "El Cliente no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO clientes set ?', [req.body]);
        res.json({ message: 'Cliente Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldClie = req.body;
        await bd.query('UPDATE clientes set ? WHERE id_cliente = ?', [req.body, id]);
        res.json({ message: "EL Cliente fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM clientes WHERE id_cliente = ?', [id]);
        res.json({ message: "El cliente fue eliminado" });
    }

}

export const clientesController = new ClientesController();
export default clientesController;