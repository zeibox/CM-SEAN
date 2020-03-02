import { Component, OnInit } from '@angular/core';
import { ConsultorioService } from 'src/app/services/consultorio.service';

@Component({
  selector: 'app-consultorios',
  templateUrl: './consultorios.component.html',
  styleUrls: ['./consultorios.component.css']
})
export class ConsultoriosComponent implements OnInit {

  data;
  value;

  constructor(private consultorioServ: ConsultorioService) { }

  ngOnInit() {
    this.getConsultorios();
  }

  getInputValue() {
  }

  getConsultorios() {
    this.consultorioServ.getConsultorios().subscribe(
      res => {
        this.data = res;
        console.log(this.data);
      },
      err => console.log(err)
    );
  }


}
