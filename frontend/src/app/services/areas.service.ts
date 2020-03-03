import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Area } from '../interfaces/areas';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AreasService {

  constructor(private http: HttpClient) { }

  searchAreas(cadena: string) {
    return this.http.get(`${environment.url}/areas/search/${cadena}`);
  }

  getAreas() {
    return this.http.get(`${environment.url}/areas`);
  }

  getArea(id: string) {
    return this.http.get(`${environment.url}/areas/${id}`);
  }

  deleteArea(id: string) {
    return this.http.delete(`${environment.url}/areas/${id}`);
  }

  saveArea(cliente: Area) {
    return this.http.post(`${environment.url}/areas`, cliente);
  }

  updateArea(id: string, updatedArea: Area): Observable<Area> {
    return this.http.put(`${environment.url}/areas/${id}`, updatedArea);
  }

}
