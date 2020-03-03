import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultorioService } from '../../../services/consultorio.service';
import { DatePipe } from '@angular/common';
import { Consultorio } from '../../../interfaces/consultorios';

@Component({
  selector: 'app-consultorio',
  templateUrl: './consultorio.component.html',
  styleUrls: ['./consultorio.component.css']
})
export class ConsultorioComponent implements OnInit {

  formGroup: FormGroup;
  idRute: any;
  data: any;
  edit: boolean;
  delete: boolean;
  add: boolean;
  errors: string;
  datePipe = new DatePipe('es-AR');

  consultorio: Consultorio = {
    id_consultorio: 0,
    id_area: 0,
    piso: '',
    numero: '',
    id_user: 1,
    creado_en: new Date()
  };


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private consultorioServ: ConsultorioService,
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
    this.postData(this.formGroup.value.consultorios);
  }
  onSubmitId() {
    // agregar metodo que le pega a la api PUT
    this.putData(this.formGroup.value.consultorios);
  }
  deleteCons() {
    this.delData();
  }
// SUBMIT METHODS----------------------------------------------------------


// CRUD METHODS------------------------------------------------------------

  getOne(id) {

    this.consultorioServ.getOneConsultorio(id).subscribe(
      res => {
        this.data = res;
        console.log(this.data);

        this.formGroup = this.fb.group({
          consultorios: this.fb.group({
          id_consultorio: [{value: this.data.id_consultorio, disabled: true}],
          fecha: [{value: this.datePipe.transform(this.data.creado_en, 'dd MMMM yy, HH:mm', '+1800'), disabled: true}],
          nombre: this.data.nombre,
          piso: this.data.piso,
          numero: this.data.numero,
        }),
      }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs
    },
      err => this.errors = err.error.text
    );
  }

  putData(body: Consultorio) {
    // console.log(body);
    // this.consultorio.nombre = body.nombre;
    this.consultorio.id_consultorio = body.id_consultorio;
    this.consultorio.numero = body.numero;
    this.consultorio.piso = body.piso;
    this.consultorio.id_area = body.id_area;
    this.consultorio.creado_en = new Date();

    console.log(this.consultorio);

    this.consultorioServ.putConsultorio(this.idRute, this.consultorio).subscribe(
      res => {
        // this.data = res;
        console.log(res);
        this.errors = null;
        this.edit = true;
        setTimeout(() => {
          this.edit = false;
          this.router.navigate(['panel/consultorios']);
        }, 2000);
      },
      err => this.errors = err
    );
  }

  postData(body) {
    this.consultorioServ.postConsultorio(body).subscribe(
        res => {
          this.errors = null;
          this.add = true;
          setTimeout(() => {
            this.add = false;
            this.router.navigate(['panel/consultorios']);
          }, 2000);
        },
        err => this.errors = err
    );
  }

  async delData() {
    try {
      this.data = await this.consultorioServ
      .delConsultorio(this.idRute)
      .toPromise();

      this.delete = true;
      setTimeout(() => {
        this.delete = false;
        this.router.navigate(['panel/consultorios']);
      }, 2000);

    } catch (err) {
      this.errors = err.error.errors.message;
    }
  }

// CRUD METHODS------------------------------------------------------------

formGroupFormat(){
  this.formGroup = this.fb.group({
    consultorios: this.fb.group({
      id_consultorio: [{value: '', disabled: true}],
      fecha: [{value: '', disabled: true}],
      nombre: ['', Validators.required],
      piso: ['', Validators.required],
      numero: ['', Validators.required]
    }),
  }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs
}

}
