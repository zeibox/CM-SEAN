import { Component, OnInit, HostBinding } from '@angular/core';
import { AreasService } from 'src/app/services/areas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-areas',
  templateUrl: './areas.component.html',
  styleUrls: ['./areas.component.css']
})
export class AreasComponent implements OnInit {


  @HostBinding('class') classes = 'row';

  areas: any = [];

  constructor(private userServ: AreasService, private ruta: Router) {}

  ngOnInit() {
    this.cargarListaDeAreas();
  }

  addArea() {
    this.ruta.navigate(['/panel/area']);
  }

  buscarAreas(cadena: string) {
    // console.log('cadena: ', cadena);
    if (cadena === '') {
      this.cargarListaDeAreas();
    } else {
      this.userServ.searchAreas(cadena).subscribe(
        res => {
          this.areas = res;
        },
        err => console.log(err)
      );
    }
  }

  cargarListaDeAreas(){
    this.userServ.getAreas().subscribe(
      res => {
        this.areas = res;
      },
      err => console.log(err)
    );
  }

  deleteArea(id: string){
    // console.log(id);
    this.userServ.deleteArea(id).subscribe(
      res => {
        console.log(res);
        this.cargarListaDeAreas();
      },
      err => console.log(err)
    )
  }
}