import { Request, Response } from 'express';
import bd from '../routes/database';

class AlumnosController {

    public async list(req: Request, res: Response): Promise<void> {
        const prod = await bd.query('SELECT * FROM alumnos');
        res.json(prod);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const prod = await bd.query('SELECT * FROM alumnos WHERE id_alumno = ?', [id]);
        // console.log(prod.length);
        if (prod.length > 0) {
            return res.json(prod[0]);
        }
        res.status(404).json({ text: "El Alumno no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO alumnos set ?', [req.body]);
        res.json({ message: 'Alumno Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE alumnos set ? WHERE id_alumno = ?', [req.body, id]);
        res.json({ message: "EL Alumno fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM alumnos WHERE id_alumno = ?', [id]);
        res.json({ message: "El Alumno fue eliminado" });
    }

}

export const alumnosController = new AlumnosController();
export default alumnosController;