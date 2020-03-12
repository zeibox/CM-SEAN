import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Provincia } from '../interfaces/provincias';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {

  constructor(private http: HttpClient) { }

  getProvincias() {
    return this.http.get(`${ environment.url }/provincias`);
  }

  getOneProvincia(id) {
    return this.http.get(`${ environment.url }/provincias/${ id }`);
  }

  postProvincia(body: Provincia) {
    return this.http.post(`${ environment.url }/provincias`, body);
  }

  deleteProvincia(id: string) {
    return this.http.delete(`${environment.url}/provincias/${id}`);
  }

  putProvincia(id: string, body: Provincia): Observable<Provincia> {
    return this.http.put(`${ environment.url }/provincias/${ id }`, body);
  }
}
