"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = __importStar(require("promise-mysql"));
const keys_1 = __importDefault(require("./keys"));
const pool = mysql.createPool(keys_1.default.database);
pool.getConnection()
    .then(connection => {
    pool.releaseConnection(connection);
    console.log('Conectado a la BD');
});
exports.default = pool;
