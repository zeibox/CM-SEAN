import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Genero } from '../../../interfaces/generos';
import { GenerosService } from '../../../services/generos.service';

@Component({
  selector: 'app-genero',
  templateUrl: './genero.component.html',
  styleUrls: ['./genero.component.css']
})
export class GeneroComponent implements OnInit {

  formGroup: FormGroup;
  datePipe = new DatePipe('es-AR');
  areas: any;
  idRute: any;
  data: any;
  edit: boolean;
  delete: boolean;
  add: boolean;
  errors: string;
  selectedOption: any;
  areaSelected: any;
  genero: Genero = {
    id_genero: 0,
    nombre: '',
    id_user: 1,
    creado_en: new Date()
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private generoServ: GenerosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.idRute = this.route.snapshot.params.id;
    if (this.idRute) {
      this.getOne(this.idRute);
    }
    this.formGroupFormat();
  }

// SUBMIT METHODS----------------------------------------------------------
  onSubmit() {
    // agregar metodo que le pega a la api POST
    this.postData(this.formGroup.value.generos);
  }
  onSubmitId() {
    // agregar metodo que le pega a la api PUT
    this.putData(this.formGroup.value.generos);
  }
// SUBMIT METHODS----------------------------------------------------------


// CRUD METHODS------------------------------------------------------------


  getOne(id) {
    this.generoServ.getGenero(id).subscribe(
      res => {
        this.data = res;
        // console.log(this.data);

        this.formGroup = this.fb.group({
          generos: this.fb.group({
          id_genero: [{value: this.data.id_genero, disabled: true}],
          creado_en: [{value: this.datePipe.transform(this.data.creado_en, 'dd MMMM yy, HH:mm', '-600'), disabled: true}],
          nombre: this.data.nombre
        }),
      }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs
    },
      err => this.errors = err.error.text
    );
  }

  putData(body) {
    // console.log('como viene del form: ', body);
    this.genero.id_genero = this.data.id_genero;
    this.genero.nombre = body.nombre;
    this.genero.creado_en = new Date();
    // console.log('antes de mandarlo', this.genero);

    this.generoServ.updateGenero(this.idRute, this.genero).subscribe(
      res => {
        this.edit = true;
        setTimeout(() => {
          this.edit = false;
          this.router.navigate(['panel/generos']);
        }, 1500);
      },
      err => this.errors = err.error.text
    );
  }

  postData(body) {
    console.log('como viene del form: ', body);
    this.genero.nombre = body.nombre;
    console.log('antes de mandarlo: ', this.genero);

    this.generoServ.saveGenero(this.genero).subscribe(
        res => {
          this.add = true;
          setTimeout(() => {
            this.add = false;
            this.router.navigate(['panel/generos']);
          }, 1500);
        },
        err => this.errors = err.error.text
    );
  }

  delData() {
    // console.log(this.idRute);
    this.generoServ.deleteGenero(this.idRute).subscribe(
      res => {
        this.delete = true;
        setTimeout(() => {
          this.delete = false;
          this.router.navigate(['panel/generos']);
        }, 1500);
      },
      err => this.errors = err.error.text
    );
  }

// CRUD METHODS------------------------------------------------------------

  formGroupFormat() {
    this.formGroup = this.fb.group({
      generos: this.fb.group({
        id_genero: [{value: '', disabled: true}],
        id_area: [{value: '', disabled: true}],
        creado_en: [{value: '', disabled: true}],
        nombre: ['', Validators.required]
      }),
    }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs
  }
}
