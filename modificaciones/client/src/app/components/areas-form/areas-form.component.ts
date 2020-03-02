import { Component, OnInit, HostBinding } from '@angular/core';
import { Area } from '../../models/areas';
import { AreasService } from '../../services/areas.service';
import { Router, ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-areas-form',
  templateUrl: './areas-form.component.html',
  styleUrls: ['./areas-form.component.css']
})
export class AreasFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  area: Area = {
    id_area: 0,
    nombre: '',
    id_user: 1,
    creado_en: new Date()
  };

  edit: boolean = false;

  constructor(private servArea: AreasService, private ruta: Router, private datosRec: ActivatedRoute) { }

  ngOnInit() {
    const parametros = this.datosRec.snapshot.params;
    if (parametros.id) {
      this.servArea.getArea(parametros.id).subscribe(
        res => {
          this.area = res;
          this.edit = true;
        },
        err => console.error(err)
      )
    }
  }

  grabarAreaNueva() {
    const parametros = this.datosRec.snapshot.params;
    delete this.area.creado_en;    //
    delete this.area.id_area;  // Elimino las propiedades
    this.servArea.saveArea(this.area)
      .subscribe(
        res => {
          //console.log(res);
          this.ruta.navigate(['/areas']);
        },
        err => console.log(err)
      )
  }

  actualizarArea() {
    console.log(this.area);
    delete this.area.creado_en;  // Para no cambiar la fecha - No enviamos este parámetro
    this.servArea.updateArea(this.area.id_area, this.area)
    .subscribe(
      res => {
        //console.log(res);
        this.ruta.navigate(['/areas']);
      },
      err => console.log(err)
    )
  }
}
