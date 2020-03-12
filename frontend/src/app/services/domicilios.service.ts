import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Domicilio } from '../interfaces/domicilios';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DomiciliosService {
  constructor(private http: HttpClient) { }

  searchDomicilios(cadena: string) {
    return this.http.get(`${environment.url}/domicilios/search/${cadena}`);
  }

  getDomicilios() {
    return this.http.get(`${environment.url}/domicilios`);
  }

  getDomicilio(id: string) {
    return this.http.get(`${environment.url}/domicilios/${id}`);
  }

  getDomicilioByName(name: string) {
    return this.http.get(`${environment.url}/domicilios/byname/${name}`);
  }

  deleteDomicilio(id: string) {
    return this.http.delete(`${environment.url}/domicilios/${id}`);
  }

  saveDomicilio(cliente: Domicilio) {
    return this.http.post(`${environment.url}/domicilios`, cliente);
  }

  updateDomicilio(id: string, updatedDomicilio: Domicilio): Observable<Domicilio> {
    return this.http.put(`${environment.url}/domicilios/${id}`, updatedDomicilio);
  }

  // provisorio getProvincias()
  getProvincias() {
    return this.http.get(`${environment.url}/provincias`);
  }

  getLocalidades() {
    return this.http.get(`${environment.url}/localidades`);
  }

}

