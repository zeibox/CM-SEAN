import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Genero } from '../interfaces/generos';

@Injectable({
  providedIn: 'root'
})
export class GenerosService {

  constructor(private http: HttpClient) { }

  searchGeneros(cadena: string) {
    return this.http.get(`${environment.url}/generos/search/${cadena}`);
  }

  getGeneros() {
    return this.http.get(`${environment.url}/generos`);
  }

  getGenero(id: string) {
    return this.http.get(`${environment.url}/generos/${id}`);
  }

  deleteGenero(id: string) {
    return this.http.delete(`${environment.url}/generos/${id}`);
  }

  saveGenero(cliente: Genero) {
    return this.http.post(`${environment.url}/generos`, cliente);
  }

  updateGenero(id: string, updatedGenero: Genero): Observable<Genero> {
    return this.http.put(`${environment.url}/generos/${id}`, updatedGenero);
  }

}
