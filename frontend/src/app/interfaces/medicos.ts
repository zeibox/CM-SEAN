export interface Medico {
    imagen?: string;
    nombres?: string;
    apellido?: string;
    celular?: string;
    email?: string;
    cuit?: string;
    matricula?: string;
    numero?: string;
    fe_ingreso?: Date;
    vto_acuerdo?: Date;
    creado_en?: Date;
    id_jerarquia?: number;
    id_documento_tipo?: number;
    id_genero?: number;
    id_medico?: number;
    id_user?: number;
}

export interface MedicoEspecialidad {
    id_medico?: number;
    id_especialidad?: number;
    horarios?: string;
}

export interface MedicoDomicilio {
    id_medico?: number;
    id_dom?: number;
}
