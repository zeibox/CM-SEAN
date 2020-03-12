import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomiciliosService } from 'src/app/services/domicilios.service';

@Component({
  selector: 'app-domicilios',
  templateUrl: './domicilios.component.html',
  styleUrls: ['./domicilios.component.css']
})
export class DomiciliosComponent implements OnInit {

  data: any;
  value: any;

  constructor(
    private domiciliosServ: DomiciliosService,
    private router: Router) { }

  ngOnInit() {
    this.getDomicilios();
  }

  addArea() {
    this.router.navigate(['/panel/domicilio']);
  }

  getDomicilios() {
    this.domiciliosServ.getDomicilios().subscribe(
      res => {
        this.data = res;
        // console.log(this.data);
      },
      err => console.log('error: ', err)
    );
  }

  buscarDomicilios(cadena: string) {
    if (cadena === '') {
      this.getDomicilios();
    } else {}
  }


}
