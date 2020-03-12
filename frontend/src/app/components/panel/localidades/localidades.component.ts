import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalidadesService } from 'src/app/services/localidades.service';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.css']
})
export class LocalidadesComponent implements OnInit {

  data: any;
  value: any;

  constructor(
    private localidadesServ: LocalidadesService,
    private router: Router) { }

  ngOnInit() {
    this.getLocalidades();
  }

  addArea() {
    this.router.navigate(['/panel/localidad']);
  }

  getLocalidades() {
    this.localidadesServ.getLocalidades().subscribe(
      res => {
        this.data = res;
        //console.log(this.data);
      },
      err => console.log('error: ', err)
    );
  }

  buscarLocalidades(cadena: string) {
    if (cadena === '') {
      this.getLocalidades();
    } else {}
  }


}
