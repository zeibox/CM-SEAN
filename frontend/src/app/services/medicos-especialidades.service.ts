import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { MedicoEspecialidad } from '../interfaces/medicos';


@Injectable({
  providedIn: 'root'
})
export class MedicosEspecialidadesService {

  constructor(private http: HttpClient) { }

  getHorarios() {
    return this.http.get(`${environment.url}/medicos/horarios`);
  }

  getMedEspecialidades() {
    return this.http.get(`${environment.url}/medicosEspecialidades`);
  }

  getMedEspecialidad(id: string) {
    return this.http.get(`${environment.url}/medicosEspecialidades/${id}`);
  }

  deleteMedEspecialidad(id: string) {
    return this.http.delete(`${environment.url}/medicosEspecialidades/${id}`);
  }

  saveMedEspecialidad(cliente: MedicoEspecialidad) {
    return this.http.post(`${environment.url}/medicosEspecialidades`, cliente);
  }

  updateMedEspecialidad(id: string, updatedMedEspecialidad: MedicoEspecialidad): Observable<MedicoEspecialidad> {
    return this.http.put(`${environment.url}/medicosEspecialidades/${id}`, updatedMedEspecialidad);
  }

}
