import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment.prod';
import { environment } from '../../environments/environment';
import { Consultorio } from '../interfaces/consultorios';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConsultorioService {

  constructor(private http: HttpClient) { }

  getConsultorios() {
    return this.http.get(`${ environment.url }/consultorios`);
  }

  getOneConsultorio(id) {
    return this.http.get(`${ environment.url }/consultorios/${ id }`);
  }

  getOneConsultorioByName(name) {
    return this.http.get(`${ environment.url }/consultorios/${ name }`);
  }

  postConsultorio(body) {
    return this.http.post(`${ environment.url }/consultorios`, body);
  }

  delConsultorio(id) {
    return this.http.delete(`${ environment.url }/consultorios/${ id }`);
  }

  putConsultorio(id: string, body: Consultorio): Observable<Consultorio> {
    return this.http.put(`${ environment.url }/consultorios/${ id }`, body);
  }


}
