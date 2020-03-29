import { Request, Response } from 'express';
import bd from '../routes/database';

class MedicosController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM v_medicos');
        res.json(dato);
    }

    public async listHorarios(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM horarios');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM v_medicos_c WHERE id_medico = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El Médico no existe" });
    }

    public async create(req: Request, res: Response): Promise<any> {
        try{
            const result = await bd.query('INSERT INTO v_medicos set ?', [req.body]);
            // const ultimo = await bd.query('SELECT LAST_INSERT_ID()');
            const ultimo = await bd.query('SELECT id_medico FROM v_medicos ORDER BY id_medico DESC LIMIT 1');
            return res.json(ultimo[0]);
        }catch(err){
            res.json({ error: err.sqlMessage });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE medicos set ? WHERE id_medico = ?', [req.body, id]);
        res.json({ message: "EL Médico fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM v_medicos WHERE id_medico = ?', [id]);
        res.json({ message: "El Médico fue eliminado" });
    }

}

export const medicosController = new MedicosController();
export default medicosController;