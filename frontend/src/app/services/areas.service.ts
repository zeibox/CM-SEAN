import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area } from '../interfaces/areas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreasService {

  API_URI = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  searchAreas(cadena: string) {
    return this.http.get(`${this.API_URI}/areas/search/${cadena}`);
  }

  getAreas() {
    return this.http.get(`${this.API_URI}/areas`);
  }

  getArea(id: string) {
    return this.http.get(`${this.API_URI}/areas/${id}`);
  }

  deleteArea(id: string) {
    return this.http.delete(`${this.API_URI}/areas/${id}`);
  }

  saveArea(cliente: Area) {
    return this.http.post(`${this.API_URI}/areas`, cliente);
  }

  updateArea(id: string|number, updatedArea: Area): Observable<Area> {
    return this.http.put(`${this.API_URI}/areas/${id}`, updatedArea);
  }

}
