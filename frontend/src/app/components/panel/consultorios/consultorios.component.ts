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
    this.getData();
  }

  getInputValue() {
  }

  async getData() {
    try {
      this.data = await this.consultorioServ
      .getConsultorios()
      .toPromise();
      this.data = this.data.consultorios;
      console.log(this.data);

    } catch (error) {}
  }


}
