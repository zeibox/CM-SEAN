"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const actoresRoutes_1 = __importDefault(require("./routes/actoresRoutes"));
const clientesRoutes_1 = __importDefault(require("./routes/clientesRoutes"));
const contactosRoutes_1 = __importDefault(require("./routes/contactosRoutes"));
const juegosRoutes_1 = __importDefault(require("./routes/juegosRoutes"));
const productosRoutes_1 = __importDefault(require("./routes/productosRoutes"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const areasRoutes_1 = __importDefault(require("./routes/areasRoutes"));
const areasHorariosRoutes_1 = __importDefault(require("./routes/areasHorariosRoutes"));
const consultoriosRoutes_1 = __importDefault(require("./routes/consultoriosRoutes"));
const documentosTiposRoutes_1 = __importDefault(require("./routes/documentosTiposRoutes"));
const domiciliosRoutes_1 = __importDefault(require("./routes/domiciliosRoutes"));
const especialidadesRoutes_1 = __importDefault(require("./routes/especialidadesRoutes"));
const generosRoutes_1 = __importDefault(require("./routes/generosRoutes"));
const jerarquiasRoutes_1 = __importDefault(require("./routes/jerarquiasRoutes"));
const localidadesRoutes_1 = __importDefault(require("./routes/localidadesRoutes"));
const mantenimientosRoutes_1 = __importDefault(require("./routes/mantenimientosRoutes"));
const medicosRoutes_1 = __importDefault(require("./routes/medicosRoutes"));
const medicosDomiciliosRoutes_1 = __importDefault(require("./routes/medicosDomiciliosRoutes"));
const medicosEspecialidadesRoutes_1 = __importDefault(require("./routes/medicosEspecialidadesRoutes"));
const medicosObrasSocialesRoutes_1 = __importDefault(require("./routes/medicosObrasSocialesRoutes"));
const obrasSocialesRoutes_1 = __importDefault(require("./routes/obrasSocialesRoutes"));
const obrasSocialesPlanesRoutes_1 = __importDefault(require("./routes/obrasSocialesPlanesRoutes"));
const pacientesRoutes_1 = __importDefault(require("./routes/pacientesRoutes"));
const paisesRoutes_1 = __importDefault(require("./routes/paisesRoutes"));
const provinciasRoutes_1 = __importDefault(require("./routes/provinciasRoutes"));
const turnosRoutes_1 = __importDefault(require("./routes/turnosRoutes"));
const usersRoutes_1 = __importDefault(require("./routes/usersRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    // Método que configura las propiedades de app
    config() {
        // process.env.PORT (si hay un puerto definido.... Tómalo sin toma el 3000)
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev')); // Con morgan vemos las peticiones que hace el Cliente
        this.app.use(cors_1.default()); // Con cors podemos pedir datos al servidor
        this.app.use(express_1.default.json()); // express define que debe aceptar formatos json de app Cliente
        this.app.use(express_1.default.urlencoded({ extended: false })); // Para enviar información desde un form HTML
    }
    // Método que definine las rutas de los servidores
    routes() {
        this.app.use('/', indexRoutes_1.default);
        this.app.use('/actores', actoresRoutes_1.default);
        this.app.use('/clientes', clientesRoutes_1.default);
        this.app.use('/contactos', contactosRoutes_1.default);
        this.app.use('/juegos', juegosRoutes_1.default);
        this.app.use('/productos', productosRoutes_1.default);
        this.app.use('/areas', areasRoutes_1.default);
        this.app.use('/areasHorarios', areasHorariosRoutes_1.default);
        this.app.use('/consultorios', consultoriosRoutes_1.default);
        this.app.use('/documentosTipos', documentosTiposRoutes_1.default);
        this.app.use('/domicilios', domiciliosRoutes_1.default);
        this.app.use('/especialidades', especialidadesRoutes_1.default);
        this.app.use('/generos', generosRoutes_1.default);
        this.app.use('/jerarquias', jerarquiasRoutes_1.default);
        this.app.use('/localidades', localidadesRoutes_1.default);
        this.app.use('/mantenimientos', mantenimientosRoutes_1.default);
        this.app.use('/medicos', medicosRoutes_1.default);
        this.app.use('/medicosDomicilios', medicosDomiciliosRoutes_1.default);
        this.app.use('/medicosEspecialidades', medicosEspecialidadesRoutes_1.default);
        this.app.use('/medicosObrasSociales', medicosObrasSocialesRoutes_1.default);
        this.app.use('/obrasSociales', obrasSocialesRoutes_1.default);
        this.app.use('/obrasSocialesPlanes', obrasSocialesPlanesRoutes_1.default);
        this.app.use('/pacientes', pacientesRoutes_1.default);
        this.app.use('/paises', paisesRoutes_1.default);
        this.app.use('/provincias', provinciasRoutes_1.default);
        this.app.use('/turnos', turnosRoutes_1.default);
        this.app.use('/users', usersRoutes_1.default);
    }
    // Método que inicializa el servidor para entrar en modo Escucha
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
// Instanciamos la clase Server
const SERVER = new Server();
SERVER.start();
