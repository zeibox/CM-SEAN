import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jerarquia } from '../interfaces/jerarquias';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class JerarquiasService {

  constructor(private http: HttpClient) { }

  searchJerarquias(cadena: string) {
    return this.http.get(`${environment.url}/jerarquias/search/${cadena}`);
  }

  getJerarquias() {
    return this.http.get(`${environment.url}/jerarquias`);
  }

  getJerarquia(id: string) {
    return this.http.get(`${environment.url}/jerarquias/${id}`);
  }

  deleteJerarquia(id: string) {
    return this.http.delete(`${environment.url}/jerarquias/${id}`);
  }

  saveJerarquia(cliente: Jerarquia) {
    return this.http.post(`${environment.url}/jerarquias`, cliente);
  }

  updateJerarquia(id: string, updatedJerarquia: Jerarquia): Observable<Jerarquia> {
    return this.http.put(`${environment.url}/jerarquias/${id}`, updatedJerarquia);
  }


}
