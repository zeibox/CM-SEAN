import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Consultorio } from '../models/consultorios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultoriosService {

  API_URI = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  searchConsultorios(cadena: string) {
    return this.http.get(`${this.API_URI}/consultorios/search/${cadena}`);
  }

  getConsultorios() {
    return this.http.get(`${this.API_URI}/consultorios`);
  }

  getConsultorio(id: string) {
    return this.http.get(`${this.API_URI}/consultorios/${id}`);
  }

  deleteConsultorio(id: string) {
    return this.http.delete(`${this.API_URI}/consultorios/${id}`);
  }

  saveConsultorio(actor: Consultorio) {
    return this.http.post(`${this.API_URI}/consultorios`, actor);
  }

  updateConsultorio(id: string|number, updatedConsultorio: Consultorio): Observable<Consultorio> {
    return this.http.put(`${this.API_URI}/consultorios/${id}`, updatedConsultorio);
  }

}
