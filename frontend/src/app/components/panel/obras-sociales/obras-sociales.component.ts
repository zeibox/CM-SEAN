import { Component, OnInit, HostBinding } from '@angular/core';
import { ObrasSocialesService } from 'src/app/services/obras-sociales.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-obras-sociales',
  templateUrl: './obras-sociales.component.html',
  styleUrls: ['./obras-sociales.component.css']
})
export class ObrasSocialesComponent implements OnInit {

  obrasSociales: any = [];

  constructor(private obrasSocialesServ: ObrasSocialesService, private ruta: Router) {}

  ngOnInit() {
    this.getObrasSociales();
  }

  addObraSocial() {
    this.ruta.navigate(['/panel/obraSocial']);
  }

  searchObraSocial(cadena: string) {
    // console.log('cadena: ', cadena);
    if (cadena === '') {
      this.getObrasSociales();
    } else {
      this.obrasSocialesServ.searchObrasSociales(cadena).subscribe(
        res => {
          this.obrasSociales = res;
        },
        err => console.log(err)
      );
    }
  }

  getObrasSociales(){
    this.obrasSocialesServ.getObrasSociales().subscribe(
      res => {
        this.obrasSociales = res;
      },
      err => console.log(err)
    );
  }

  deleteObraSocial(id: string){
    // console.log(id);
    this.obrasSocialesServ.deleteObraSocial(id).subscribe(
      res => {
        console.log(res);
        this.getObrasSociales();
      },
      err => console.log(err)
    )
  }

}
