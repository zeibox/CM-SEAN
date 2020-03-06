import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultorioService } from '../../../services/consultorio.service';
import { DatePipe } from '@angular/common';
import { Consultorio } from '../../../interfaces/consultorios';
import { AreasService } from '../../../services/areas.service';
import { Observable, from, of } from 'rxjs';
import { tap, map, filter } from 'rxjs/operators';
import { Area } from '../../../interfaces/areas';

@Component({
  selector: 'app-consultorio',
  templateUrl: './consultorio.component.html',
  styleUrls: ['./consultorio.component.css']
})
export class ConsultorioComponent implements OnInit {

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

  consultorio: Consultorio = {
    id_consultorio: 0,
    id_area: 0,
    piso: '',
    numero: '',
    id_user: 1,
    creado_en: new Date()
  };

  test: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private consultorioServ: ConsultorioService,
    private areasServ: AreasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getAreas();
    this.idRute = this.route.snapshot.params.id;
    if (this.idRute) {
      this.getOne(this.idRute);
    }
    this.formGroupFormat();
  }

// SUBMIT METHODS----------------------------------------------------------
  onSubmit() {
    // agregar metodo que le pega a la api POST
    this.postData(this.formGroup.value.consultorios);
  }
  onSubmitId() {
    // agregar metodo que le pega a la api PUT
    this.putData(this.formGroup.value.consultorios);
  }
// SUBMIT METHODS----------------------------------------------------------


// CRUD METHODS------------------------------------------------------------

  getAreas() {
    this.areasServ.getAreas().subscribe(
      res => {
        this.areas = res;
        this.consultorio.id_area = this.areas[0].id_area;
        // console.log(this.areas);
      },
      err => this.errors = err.error.text
    );
  }

  getOne(id) {
    this.consultorioServ.getOneConsultorio(id).subscribe(
      res => {
        this.data = res;
        // console.log(this.data);

        this.formGroup = this.fb.group({
          consultorios: this.fb.group({
          id_consultorio: [{value: this.data.id_consultorio, disabled: true}],
          creado_en: [{value: this.datePipe.transform(this.data.creado_en, 'dd MMMM yy, HH:mm', '-600'), disabled: true}],
          nombre: this.data.nombre,
          piso: this.data.piso,
          numero: this.data.numero,
        }),
      }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs
        // console.log(this.formGroup.value.consultorios);
    },
      err => this.errors = err.error.text
    );
  }

  getOneByName() {
    this.areasServ.getAreaByName(this.selectedOption).subscribe(
      res => {
        this.consultorio.id_area = res[0].id_area;
        // console.log(res[0].id_area);
      },
        err => this.errors = err.error.text
    );
  }

  putData(body) {
    // console.log('como viene del form: ', body);
    this.consultorio.id_consultorio = this.data.id_consultorio;
    this.consultorio.numero = body.numero;
    this.consultorio.piso = body.piso;
    this.consultorio.creado_en = new Date();
    // console.log('antes de mandarlo', this.consultorio);

    this.consultorioServ.putConsultorio(this.idRute, this.consultorio).subscribe(
      res => {
        this.edit = true;
        setTimeout(() => {
          this.edit = false;
          this.router.navigate(['panel/consultorios']);
        }, 2000);
      },
      err => this.errors = err.error.text
    );
  }

  postData(body) {
    // console.log('como viene del form: ', body);
    this.consultorio.piso = body.piso;
    this.consultorio.numero = body.numero;
    // console.log('antes de mandarlo: ', this.consultorio);

    this.consultorioServ.postConsultorio(this.consultorio).subscribe(
        res => {
          // this.errors = null;
          this.add = true;
          setTimeout(() => {
            this.add = false;
            this.router.navigate(['panel/consultorios']);
          }, 2000);
        },
        err => this.errors = err.error.text
    );
  }

  filterTest() {
    // console.log(this.selectedOption);

    const prueba = of (this.areas);

    prueba.pipe(
    tap(res => console.log(res)),
    filter(res => res.nombre === this.selectedOption ))
    .subscribe(res => console.log(res.nombre));
  }

  delData() {
    // console.log(this.idRute);
    this.consultorioServ.deleteConsultorio(this.idRute).subscribe(
      res => {
        this.delete = true;
        setTimeout(() => {
          this.delete = false;
          this.router.navigate(['panel/consultorios']);
        }, 1500);
      },
      err => this.errors = err.error.text
    );
  }

// CRUD METHODS------------------------------------------------------------

  formGroupFormat(){
    this.formGroup = this.fb.group({
      consultorios: this.fb.group({
        id_consultorio: [{value: '', disabled: true}],
        id_area: [{value: '', disabled: true}],
        creado_en: [{value: '', disabled: true}],
        nombre: ['', Validators.required],
        piso: ['', Validators.required],
        numero: ['', Validators.required]
      }),
    }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs
  }

  getSelected(item) {
    this.selectedOption = item.target.value;
    this.getOneByName();
    this.filterTest();
  }

  
}
