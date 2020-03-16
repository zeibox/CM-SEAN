import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Localidad } from '../interfaces/localidades';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalidadesService {

  constructor(private http: HttpClient) { }

  searchLocalidades(cadena: string) {
    return this.http.get(`${environment.url}/localidades/search/${cadena}`);
  }

  getLocalidades() {
    return this.http.get(`${environment.url}/localidades`);
  }

  getLocalidad(id: string) {
    return this.http.get(`${environment.url}/localidades/${id}`);
  }

  getLocalidadByName(name: string) {
    return this.http.get(`${environment.url}/localidades/byname/${name}`);
  }

  deleteLocalidad(id: string) {
    return this.http.delete(`${environment.url}/localidades/${id}`);
  }

  saveLocalidad(cliente: Localidad) {
    return this.http.post(`${environment.url}/localidades`, cliente);
  }

  updateLocalidad(id: string, updatedLocalidad: Localidad): Observable<Localidad> {
    return this.http.put(`${environment.url}/localidades/${id}`, updatedLocalidad);
  }

  // provisorio getProvincias()
  getProvincias() {
    return this.http.get(`${environment.url}/provincias`);
  }

}
