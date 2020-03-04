import { Component, OnInit, HostBinding } from '@angular/core';
import { EspecialidadesService } from 'src/app/services/especialidades.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-especialidades',
  templateUrl: './especialidades.component.html',
  styleUrls: ['./especialidades.component.css']
})
export class EspecialidadesComponent implements OnInit {


  @HostBinding('class') classes = 'row';

  especialidades: any = [];

  constructor(private userServ: EspecialidadesService, private ruta: Router) {}

  ngOnInit() {
    this.cargarListaDeEspecialidades(); //getEspecialidades
  }

  addEspecialidad() {
    this.ruta.navigate(['/panel/especialidad']);
  }

  buscarEspecialidades(cadena: string) { //searchEspecialidades
    // console.log('cadena: ', cadena);
    if (cadena === '') {
      this.cargarListaDeEspecialidades();
    } else {
      this.userServ.searchEspecialidades(cadena).subscribe(
        res => {
          this.especialidades = res;
        },
        err => console.log(err)
      );
    }
  }

  cargarListaDeEspecialidades() {
    this.userServ.getEspecialidades().subscribe(
      res => {
        this.especialidades = res;
        console.log(this.especialidades);
      },
       // err => console.log(err)
    );
  }

  deleteEspecialidad(id: string){
    // console.log(id);
    this.userServ.deleteEspecialidad(id).subscribe(
      res => {
        console.log(res);
        this.cargarListaDeEspecialidades();
      },
      err => console.log(err)
    )
  }
}
