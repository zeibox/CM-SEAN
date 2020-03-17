import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { LocalidadesService } from 'src/app/services/localidades.service';

@Component({
  selector: 'app-localidades',
  templateUrl: './localidades.component.html',
  styleUrls: ['./localidades.component.css']
})
export class LocalidadesComponent implements OnInit {

  @ViewChild('inputData') inputData: ElementRef;
  data: any;
  value: any;
  search = '';

  constructor(
    private localidadesServ: LocalidadesService,
    private router: Router) { }

  ngOnInit() {
    this.getLocalidades();
  }

  getInputValue() {
    this.search = this.inputData.nativeElement.value;
    // console.log(this.search);
  }

  addArea() {
    this.router.navigate(['/panel/localidad']);
  }

  getLocalidades() {
    this.localidadesServ.getLocalidades().subscribe(
      res => {
        this.data = res;
        console.log(this.data);
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
