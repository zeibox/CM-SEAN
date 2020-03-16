import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { environment } from '../../environments/environment.prod';
import { environment } from '../../environments/environment';
import { Medico } from '../interfaces/medicos';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  private httpOptionsGeneral = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  constructor(private http: HttpClient) { }

  getMedicos() {
    return this.http.get(`${ environment.url }/medicos`)
      .pipe(map(this.extractData));
  }

  getOneMedico(id) {
    return this.http.get(`${ environment.url }/medicos/${ id }`)
      .pipe(map(this.extractData));
  }

  putMedico(id, body) {
    return this.http.put(`${ environment.url }/medicos/${ id }`, body)
      .pipe(map(this.extractData));
  }

  postMedico(body) {
    return this.http.post(`${ environment.url }/medicos`, body)
      .pipe(map(this.extractData));
  }

  delMedico(id) {
    return this.http.delete(`${ environment.url }/medicos/${ id }`)
      .pipe(map(this.extractData));
  }

  getMedics() {
    return this.http.get <Medico[]> ('/assets/jsonFiles/medics.json');
  }
}
