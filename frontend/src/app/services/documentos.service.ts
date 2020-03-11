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
    return this.http.get(`${ environment.url }/documentosTipos`);
  }

  getDocumento(id) {
    return this.http.get(`${ environment.url }/documentosTipos/${ id }`);
  }

  postDocumento(body: Documento) {
    return this.http.post(`${ environment.url }/documentosTipos`, body);
  }

  deleteDocumento(id: string) {
    return this.http.delete(`${environment.url}/documentosTipos/${id}`);
  }

  putDocumento(id: string, body: Documento): Observable<Documento> {
    return this.http.put(`${ environment.url }/documentosTipos/${ id }`, body);
  }


}
