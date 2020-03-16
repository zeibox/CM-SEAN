import { Component, OnInit, HostBinding } from '@angular/core';
import { PaisesService } from 'src/app/services/paises.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.css']
})
export class PaisesComponent implements OnInit {

  paises: any = [];

  constructor(private userServ: PaisesService, private ruta: Router) {}

  ngOnInit() {
    this.cargarListaDePaises();
  }

  addPais() {
    this.ruta.navigate(['/panel/pais']);
  }

  buscarPaises(cadena: string) {
    // console.log('cadena: ', cadena);
    if (cadena === '') {
      this.cargarListaDePaises();
    } else {
      this.userServ.searchPaises(cadena).subscribe(
        res => {
          this.paises = res;
        },
        err => console.log(err)
      );
    }
  }

  cargarListaDePaises(){
    this.userServ.getPaises().subscribe(
      res => {
        this.paises = res;
      },
      err => console.log(err)
    );
  }

  deletePais(id: string){
    // console.log(id);
    this.userServ.deletePais(id).subscribe(
      res => {
        console.log(res);
        this.cargarListaDePaises();
      },
      err => console.log(err)
    )
  }
}