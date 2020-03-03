"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
    index(req, res) {
        res.send('Estamos en Index');
        // res.json({text: 'API Is /api/clientes'});
    }
}
exports.indexController = new IndexController();
