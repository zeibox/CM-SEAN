import express, { Application } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import actoresRoutes from './routes/actoresRoutes';
import clientesRoutes from './routes/clientesRoutes';
import contactosRoutes from './routes/contactosRoutes';
import juegosRoutes from './routes/juegosRoutes';
import productosRoutes from './routes/productosRoutes';
import indexRoutes from './routes/indexRoutes';
import areasRoutes from './routes/areasRoutes';
import areasHorariosRoutes from './routes/areasHorariosRoutes';
import consultoriosRoutes from './routes/consultoriosRoutes';
import documentosTiposRoutes from './routes/documentosTiposRoutes';
import domiciliosRoutes from './routes/domiciliosRoutes';
import especialidadesRoutes from './routes/especialidadesRoutes';
import generosRoutes from './routes/generosRoutes';
import jerarquiasRoutes from './routes/jerarquiasRoutes';
import localidadesRoutes from './routes/localidadesRoutes';
import mantenimientosRoutes from './routes/mantenimientosRoutes';
import medicosRoutes from './routes/medicosRoutes';
import medicosDomiciliosRoutes from './routes/medicosDomiciliosRoutes';
import medicosEspecialidadesRoutes from './routes/medicosEspecialidadesRoutes';
import medicosObrasSocialesRoutes from './routes/medicosObrasSocialesRoutes';
import obrasSocialesRoutes from './routes/obrasSocialesRoutes';
import obrasSocialesPlanesRoutes from './routes/obrasSocialesPlanesRoutes';
import pacientesRoutes from './routes/pacientesRoutes';
import paisesRoutes from './routes/paisesRoutes';
import provinciasRoutes from './routes/provinciasRoutes';
import turnosRoutes from './routes/turnosRoutes';
import usersRoutes from './routes/usersRoutes';

class Server {

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    // Método que configura las propiedades de app
    config(): void {
        // process.env.PORT (si hay un puerto definido.... Tómalo sin toma el 3000)
        this.app.set('port', process.env.PORT || 3000); 
        this.app.use(morgan('dev')); // Con morgan vemos las peticiones que hace el Cliente
        this.app.use(cors()); // Con cors podemos pedir datos al servidor
        this.app.use(express.json()); // express define que debe aceptar formatos json de app Cliente
        this.app.use(express.urlencoded({extended: false})); // Para enviar información desde un form HTML
    }

    // Método que definine las rutas de los servidores
    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/actores', actoresRoutes);
        this.app.use('/clientes', clientesRoutes);
        this.app.use('/contactos', contactosRoutes);
        this.app.use('/juegos', juegosRoutes);
        this.app.use('/productos', productosRoutes);
        this.app.use('/areas', areasRoutes);
        this.app.use('/areasHorarios', areasHorariosRoutes);
        this.app.use('/consultorios', consultoriosRoutes);
        this.app.use('/documentosTipos', documentosTiposRoutes);
        this.app.use('/domicilios', domiciliosRoutes);
        this.app.use('/especialidades', especialidadesRoutes);
        this.app.use('/generos', generosRoutes);
        this.app.use('/jerarquias', jerarquiasRoutes);
        this.app.use('/localidades', localidadesRoutes);
        this.app.use('/mantenimientos', mantenimientosRoutes);
        this.app.use('/medicos', medicosRoutes);
        this.app.use('/medicosDomicilios', medicosDomiciliosRoutes);
        this.app.use('/medicosEspecialidades', medicosEspecialidadesRoutes);
        this.app.use('/medicosObrasSociales', medicosObrasSocialesRoutes);
        this.app.use('/obrasSociales', obrasSocialesRoutes);
        this.app.use('/obrasSocialesPlanes', obrasSocialesPlanesRoutes);
        this.app.use('/pacientes', pacientesRoutes);
        this.app.use('/paises', paisesRoutes);
        this.app.use('/provincias', provinciasRoutes);
        this.app.use('/turnos', turnosRoutes);
        this.app.use('/users', usersRoutes);
    }

    // Método que inicializa el servidor para entrar en modo Escucha
    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}

// Instanciamos la clase Server
const SERVER = new Server();
SERVER.start();