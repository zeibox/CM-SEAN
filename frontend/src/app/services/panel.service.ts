import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment.prod';
import { environment } from '../../environments/environment';
import { Panel } from '../interfaces/panel';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class PanelService {

  constructor(private http: HttpClient) { }

  getPanels() {
    return this.http.get(`${ environment.url }/panels`);
  }

  getOnePanel(id) {
    return this.http.get(`${ environment.url }/panels/${ id }`);
  }

  postPanel(body: Panel) {
    return this.http.post(`${ environment.url }/panels`, body);
  }

  deletePanel(id: string) {
    return this.http.delete(`${environment.url}/panels/${id}`);
  }

  putPanel(id: string, body: Panel): Observable<Panel> {
    return this.http.put(`${ environment.url }/panels/${ id }`, body);
  }


}
