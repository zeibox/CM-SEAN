import { Component, OnInit } from '@angular/core';
import { MedicosService } from '../../../services/medicos.service';
import { Observable } from 'rxjs';
import { Medicos } from '../../../interfaces/medicos';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  data;
  testData: Observable<Medicos[]>;

  constructor(private medicsServ: MedicosService) { }

  ngOnInit(){
    this.getMedicos();
  }

  getMedicos() {
    this.medicsServ.getMedicos().subscribe(
      res => {
        this.data = res;
        console.log(this.data);
      },
      err => console.log(err)
    );
  }
}
