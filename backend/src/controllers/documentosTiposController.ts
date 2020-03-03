import { Request, Response } from 'express';
import bd from '../routes/database';

class DocumentosTiposController {

    public async list(req: Request, res: Response): Promise<void> {
        const dato = await bd.query('SELECT * FROM v_documentos_tipo');
        res.json(dato);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const dato = await bd.query('SELECT * FROM v_documentos_tipo WHERE id_documento_tipo = ?', [id]);
        if (dato.length > 0) {
            return res.json(dato[0]);
        }
        res.status(404).json({ text: "El tipo de documento no existe" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await bd.query('INSERT INTO documentos_tipo set ?', [req.body]);
        res.json({ message: 'tipo de documento Registrado' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldProd = req.body;
        await bd.query('UPDATE documentos_tipo set ? WHERE id_documento_tipo = ?', [req.body, id]);
        res.json({ message: "EL tipo de documento fue actualizado" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await bd.query('DELETE FROM v_documentos_tipo WHERE id_documento_tipo = ?', [id]);
        res.json({ message: "El tipo de documento fue eliminado" });
    }

}

export const documentosTiposController = new DocumentosTiposController();
export default documentosTiposController;