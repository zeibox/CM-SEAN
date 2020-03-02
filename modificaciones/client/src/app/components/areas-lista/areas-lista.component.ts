import { Component, OnInit, HostBinding } from '@angular/core';
import { AreasService } from '../../services/areas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-areas-lista',
  templateUrl: './areas-lista.component.html',
  styleUrls: ['./areas-lista.component.css']
})
export class AreasListaComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  areas: any = [];

  constructor(private userServ: AreasService, private ruta: Router) {}

  ngOnInit() {
    this.userServ.getAreas().subscribe(
      res => {
        this.areas = res;
      },
      err => console.log(err)
    );
  }

  addArea() {
    this.ruta.navigate(['/areas/add']);
  }

  buscarAreas(cadena: string) {
    // console.log('cadena: ', cadena);
    if (cadena == "") {
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
