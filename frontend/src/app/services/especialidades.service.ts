import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Especialidad } from '../interfaces/especialidades';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadesService {
  constructor(private http: HttpClient) { }

  searchEspecialidades(cadena: string) {
    return this.http.get(`${environment.url}/especialidades/search/${cadena}`);
  }

  getEspecialidades() {
    return this.http.get(`${environment.url}/especialidades`);
  }

  getEspecialidad(id: string) {
    return this.http.get(`${environment.url}/especialidades/${id}`);
  }

  deleteEspecialidad(id: string) {
    return this.http.delete(`${environment.url}/especialidades/${id}`);
  }

  saveEspecialidad(cliente: Especialidad) {
    return this.http.post(`${environment.url}/especialidades`, cliente);
  }

  updateEspecialidad(id: string, updatedEspecialidad: Especialidad): Observable<Especialidad> {
    return this.http.put(`${environment.url}/especialidades/${id}`, updatedEspecialidad);
  }

}