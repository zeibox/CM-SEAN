import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pais } from '../interfaces/paises';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private http: HttpClient) { }

  searchPaises(cadena: string) {
    return this.http.get(`${environment.url}/paises/search/${cadena}`);
  }

  getPaises() {
    return this.http.get(`${environment.url}/paises`);
  }

  getPais(id: string) {
    return this.http.get(`${environment.url}/paises/${id}`);
  }

  deletePais(id: string) {
    return this.http.delete(`${environment.url}/paises/${id}`);
  }

  savePais(cliente: Pais) {
    return this.http.post(`${environment.url}/paises`, cliente);
  }

  updatePais(id: string, updatedPais: Pais): Observable<Pais> {
    return this.http.put(`${environment.url}/paises/${id}`, updatedPais);
  }

}

