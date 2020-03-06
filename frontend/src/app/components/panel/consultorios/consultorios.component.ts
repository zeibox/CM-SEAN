import { Component, OnInit } from '@angular/core';
import { ConsultorioService } from 'src/app/services/consultorio.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consultorios',
  templateUrl: './consultorios.component.html',
  styleUrls: ['./consultorios.component.css']
})
export class ConsultoriosComponent implements OnInit {

  data;
  value;

  constructor(
    private consultorioServ: ConsultorioService,
    private router: Router) { }

  ngOnInit() {
    this.getConsultorios();
  }

  addArea() {
    this.router.navigate(['/panel/consultorio']);
  }

  getConsultorios() {
    this.consultorioServ.getConsultorios().subscribe(
      res => {
        this.data = res;
      },
      err => console.log(err)
    );
  }

  buscarConsultorios(cadena: string) {
    if (cadena === '') {
      this.getConsultorios();
    } else {}
  }


}
