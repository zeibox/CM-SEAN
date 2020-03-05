import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ObraSocial } from '../interfaces/obras-sociales';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ObrasSocialesService {

  constructor(private http: HttpClient) { }

  searchObrasSociales(cadena: string) {
    return this.http.get(`${environment.url}/obrasSociales/search/${cadena}`);
  }

  getObrasSociales() {
    return this.http.get(`${environment.url}/obrasSociales`);
  }

  getObraSocial(id: string) {
    return this.http.get(`${environment.url}/obrasSociales/${id}`);
  }

  deleteObraSocial(id: string) {
    return this.http.delete(`${environment.url}/obrasSociales/${id}`);
  }

  saveObraSocial(cliente: ObraSocial) {
    return this.http.post(`${environment.url}/obrasSociales`, cliente);
  }

  updateObraSocial(id: string, updatedObraSocial: ObraSocial): Observable<ObraSocial> {
    return this.http.put(`${environment.url}/obrasSociales/${id}`, updatedObraSocial);
  }
}
