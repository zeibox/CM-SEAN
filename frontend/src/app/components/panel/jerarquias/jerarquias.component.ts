import { Component, OnInit, HostBinding } from '@angular/core';
import { JerarquiasService } from 'src/app/services/jerarquias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jerarquias',
  templateUrl: './jerarquias.component.html',
  styleUrls: ['./jerarquias.component.css']
})
export class JerarquiasComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  jerarquias: any = [];

  constructor(private jerarquiaServ: JerarquiasService, private ruta: Router) { }

  ngOnInit() {
    this.jerarquiaServ.getJerarquias().subscribe(
      res => {
        this.jerarquias = res;
      },
      err => console.log(err)
    );
  }



  addJerarquia() {
    this.ruta.navigate(['/panel/jerarquia']);
  }

  searchJerarquias(cadena: string) {
    // console.log('cadena: ', cadena);
    if (cadena === '') {
      this.getJerarquias();
    } else {
      this.jerarquiaServ.searchJerarquias(cadena).subscribe(
        res => {
          this.jerarquias = res;
        },
        err => console.log(err)
      );
    }
  }

  getJerarquias(){
    this.jerarquiaServ.getJerarquias().subscribe(
      res => {
        this.jerarquias = res;
      },
      err => console.log(err)
    );
  }

  deleteJerarquia(id: string){
    // console.log(id);
    this.jerarquiaServ.deleteJerarquia(id).subscribe(
      res => {
        console.log(res);
        this.getJerarquias();
      },
      err => console.log(err)
    )
  }

}
