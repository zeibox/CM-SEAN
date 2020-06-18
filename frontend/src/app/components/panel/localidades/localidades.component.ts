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
  orderBy = false;
  caca = 'nombre';

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

  sortBy(prop: string, bool: boolean) {
    console.log(bool);
    if (!bool) {
      return this.data.sort((a, b) => a[prop] > b[prop] ? -1 : a[prop] === b[prop] ? 0 : 1);
    } else {
      return this.data.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] === b[prop] ? 0 : -1);
    }
  }

  getClicked(event) {
    console.log('id', event.srcElement.firstElementChild.id);
    // console.log(this.orderBy);
    const elementId = event.srcElement.firstElementChild.id;
    this.orderBy = !this.orderBy;
    let propiedad = event.target.textContent.toLowerCase(); // ...........................
    const elem = document.getElementById(elementId);
    // console.log('dadas', elem.className);
    if (elem.className === 'fas fa-sort-up' ) {
      elem.className = 'fas fa-sort-down';
    } else {
      elem.className = 'fas fa-sort-up';
    }
    if (this.data) {
    this.sortBy(propiedad==='localidad'?propiedad='nombre':propiedad, this.orderBy)
    }
  }

  getIcon(event) {
    // console.log('icon...', event.target.parentElement.textContent.toLowerCase());
    // console.log('icon...', event.target.id);
    this.orderBy = !this.orderBy;
    const elementId = event.target.id;
    let propiedad = event.target.parentElement.textContent.toLowerCase();
    const elem = document.getElementById(elementId);

    if (elem.className === 'fas fa-sort-up pl-2' ) {
      elem.className = 'fas fa-sort-down pl-2';
    } else {
      elem.className = 'fas fa-sort-up pl-2';
    }
    if (this.data) {
    this.sortBy(propiedad==='localidad'?propiedad='nombre':propiedad, this.orderBy)
    }
  }
}
