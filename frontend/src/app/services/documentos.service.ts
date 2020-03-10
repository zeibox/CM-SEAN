import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Documento } from '../interfaces/documentos';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentosService {

  constructor(private http: HttpClient) { }

  getDocumentos() {
    return this.http.get(`${ environment.url }/consultorios`);
  }

  getDocumento(id) {
    return this.http.get(`${ environment.url }/consultorios/${ id }`);
  }

  postDocumento(body: Documento) {
    return this.http.post(`${ environment.url }/consultorios`, body);
  }

  deleteDocumento(id: string) {
    return this.http.delete(`${environment.url}/consultorios/${id}`);
  }

  putDocumento(id: string, body: Documento): Observable<Documento> {
    return this.http.put(`${ environment.url }/consultorios/${ id }`, body);
  }


}
