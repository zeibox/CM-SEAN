import { Request, Response } from 'express';

class IndexController {

    public index(req: Request, res: Response) {
        res.send('Estamos en Index');
        // res.json({text: 'API Is /api/clientes'});
    }
}

export const indexController = new IndexController();