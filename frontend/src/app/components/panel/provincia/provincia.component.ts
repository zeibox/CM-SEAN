import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProvinciasService } from '../../../services/provincias.service';
import { DatePipe } from '@angular/common';
import { Provincia } from '../../../interfaces/provincias';
import { PaisesService } from '../../../services/paises.service';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.css']
})
export class ProvinciaComponent implements OnInit {


  formGroup: FormGroup;
  datePipe = new DatePipe('es-AR');
  paises: any;
  idRute: any;
  data: any;
  edit: boolean;
  delete: boolean;
  add: boolean;
  errors: string;
  selectedOption: any;
  provinciaSelected: any;


  provincia: Provincia = {
    id_provincia: 0,
    id_pais: 0,
    nombre: ''
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private provinciasServ: ProvinciasService,
    private paisesServ: PaisesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getPaises();
    this.idRute = this.route.snapshot.params.id;
    if (this.idRute) {
      this.getOne(this.idRute);
    }
    this.formGroupFormat();
  }

  // SUBMIT METHODS----------------------------------------------------------
  onSubmit() {
    // agregar metodo que le pega a la api POST
    this.postData(this.formGroup.value.provincias);
  }
  onSubmitId() {
    // agregar metodo que le pega a la api PUT
    this.putData(this.formGroup.value.provincias);
  }
  // SUBMIT METHODS----------------------------------------------------------

  // CRUD METHODS------------------------------------------------------------

  getPaises() {
    this.paisesServ.getPaises().subscribe(
      res => {
        this.paises = res;
        this.provincia.id_pais = this.paises[0].id_paises;
        // console.log(this.paises);
      },
      err => this.errors = err.error.text
    );
  }

  getOne(id) {
    this.provinciasServ.getOneProvincia(id).subscribe(
      res => {
        this.data = res;
        // console.log(this.data);

        this.formGroup = this.fb.group({
          provincias: this.fb.group({
          id_provincia: [{value: this.data.id_provincia, disabled: true}],
          nombre: this.data.nombre
        }),
      }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs
        // console.log(this.formGroup.value.provincias);
    },
      err => this.errors = err.error.text
    );
  }

  getOneByName() {
    this.paisesServ.getPaisByName(this.selectedOption).subscribe(
      res => {
        this.paises.id_pais = res[0].id_pais;
        console.log(res[0].id_pais);
      },
        err => this.errors = err.error.text
    );
  }

  putData(body) {
    this.provincia.id_provincia = this.data.id_provincia;
    this.provincia.nombre = body.nombre;

    this.provinciasServ.putProvincia(this.idRute, this.provincia).subscribe(
      res => {
        this.edit = true;
        setTimeout(() => {
          this.edit = false;
          this.router.navigate(['panel/provincias']);
        }, 2000);
      },
      err => this.errors = err.error.text
    );
  }

  postData(body) {
    // console.log('como viene del form: ', body);
    this.provincia.nombre = body.nombre;
    // console.log('antes de mandarlo: ', this.consultorio);

    this.provinciasServ.postProvincia(this.provincia).subscribe(
        res => {
          // this.errors = null;
          this.add = true;
          setTimeout(() => {
            this.add = false;
            this.router.navigate(['panel/provincias']);
          }, 2000);
        },
        err => this.errors = err.error.text
    );
  }

  delData() {
    // console.log(this.idRute);
    this.provinciasServ.deleteProvincia(this.idRute).subscribe(
      res => {
        this.delete = true;
        setTimeout(() => {
          this.delete = false;
          this.router.navigate(['panel/provincias']);
        }, 1500);
      },
      err => this.errors = err.error.text
    );
  }

// CRUD METHODS------------------------------------------------------------

  formGroupFormat(){
    this.formGroup = this.fb.group({
      provincias: this.fb.group({
        id_provincia: [{value: '', disabled: true}],
        id_pais: [{value: '', disabled: true}],
        nombre: ['', Validators.required],
      }),
    }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs
  }

  getSelected(item) {
    this.selectedOption = item.target.value;
    this.getOneByName();
  }

}
