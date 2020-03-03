import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
// import { environment } from '../../environments/environment.prod';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsultorioService {

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

  getConsultorios() {
    return this.http.get(`${ environment.url }/consultorios`)
      .pipe(map(this.extractData));
  }

  getOneConsultorio(id) {
    return this.http.get(`${ environment.url }/consultorios/${ id }`)
      .pipe(map(this.extractData));
  }

  putConsultorio(id, body) {
    return this.http.put(`${ environment.url }/consultorios/${ id }`, body)
      .pipe(map(this.extractData));
  }

  postConsultorio(body) {
    return this.http.post(`${ environment.url }/consultorios`, body)
      .pipe(map(this.extractData));
  }

  delConsultorio(id) {
    return this.http.delete(`${ environment.url }/consultorios/${ id }`)
      .pipe(map(this.extractData));
  }

}
