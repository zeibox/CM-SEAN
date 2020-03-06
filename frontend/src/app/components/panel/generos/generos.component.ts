import { Component, OnInit, HostBinding } from '@angular/core';
import { GenerosService } from 'src/app/services/generos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generos',
  templateUrl: './generos.component.html',
  styleUrls: ['./generos.component.css']
})
export class GenerosComponent implements OnInit {

  areas: any = [];

  constructor(private generosServ: GenerosService, private ruta: Router) {}

  ngOnInit() {
    this.getGeneros();
  }

  addArea() {
    this.ruta.navigate(['/panel/genero']);
  }

  searchGeneros(cadena: string) {
    // console.log('cadena: ', cadena);
    if (cadena === '') {
      this.getGeneros();
    } else {
      this.generosServ.searchGeneros(cadena).subscribe(
        res => {
          this.areas = res;
        },
        err => console.log(err)
      );
    }
  }

  getGeneros(){
    this.generosServ.getGeneros().subscribe(
      res => {
        this.areas = res;
        // console.log(this.areas);
      },
      err => console.log(err)
    );
  }

  deleteArea(id: string){
    // console.log(id);
    this.generosServ.deleteGenero(id).subscribe(
      res => {
        // console.log(res);
        this.getGeneros();
      },
      err => console.log(err)
    );
  }
}
