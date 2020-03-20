import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { environment } from '../../environments/environment.prod';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MedicoDomicilio } from '../interfaces/medicos';

@Injectable({
  providedIn: 'root'
})
export class MedicosDomiciliosService {

  constructor(private http: HttpClient) { }

  getMedicosDomicilios() {
    return this.http.get(`${environment.url}/medicosDomicilios`);
  }

  getOneMedicoDomicilio(id) {
    return this.http.get(`${ environment.url }/medicosDomicilios/${ id }`);
  }

  postMedicoDomicilio(body: MedicoDomicilio) {
    return this.http.post(`${ environment.url }/medicosDomicilios`, body);
  }

  deleteMedicoDomicilio(id: string) {
    return this.http.delete(`${environment.url}/medicosDomicilios/${id}`);
  }

  putMedicoDomicilio(id: string, body: MedicoDomicilio): Observable<MedicoDomicilio> {
    return this.http.put(`${ environment.url }/medicosDomicilios/${ id }`, body);
  }


}
