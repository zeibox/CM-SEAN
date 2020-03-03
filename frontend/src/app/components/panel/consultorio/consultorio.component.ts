import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultorioService } from '../../../services/consultorio.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-consultorio',
  templateUrl: './consultorio.component.html',
  styleUrls: ['./consultorio.component.css']
})
export class ConsultorioComponent implements OnInit {

  message: FormGroup;
  idN: any;
  data: any;
  edit: boolean;
  delete: boolean;
  add: boolean;
  errors: string;
  datePipe = new DatePipe('en-US');


  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private consultorioServ: ConsultorioService,
    private router: Router
  ) {}

  ngOnInit() {

    this.idN = this.route.snapshot.params.id;

    if (!this.idN) {
      this.message = this.fb.group({
        consultorios: this.fb.group({
          id: [{value: '', disabled: true}],
          fecha: [{value: '', disabled: true}],
          area: ['', Validators.required],
          piso: ['', Validators.required],
          numero: ['', Validators.required]
        }),
      }, { updateOn: 'blur' });  // updateOn cambia la frecuencia en que se validan los inputs
    } else {

      this.getOne(this.idN);

      this.message = this.fb.group({
        consultorios: this.fb.group({
          id: '',
          fecha: [{value: '', disabled: true}],
          area: '',
          piso: '',
          numero: '',
        }),
      }, { updateOn: 'blur' });  // updateOn cambia la frecuencia en que se validan los inputs
    }
  }

// SUBMIT METHODS----------------------------------------------------------
  onSubmit() {
    // agregar metodo que le pega a la api POST
    this.postData(this.message.value.consultorios);
  }
  onSubmitId() {
    // agregar metodo que le pega a la api PUT
    this.putData(this.message.value.consultorios);
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

        this.message = this.fb.group({
          consultorios: this.fb.group({
          id: [{value: this.data.id_consultorio, disabled: true}],
          fecha: [{value: this.datePipe.transform(this.data.creado_en), disabled: true}],
          area: this.data.id_area,
          piso: this.data.piso,
          numero: this.data.numero,
        }),
      }, { updateOn: 'blur' });  // updateOn cambia la frecuencia en que se validan los inputs
    },
      err => this.errors = err.error.text
    );
  }

  putData(body) {
    console.log(body);
    this.consultorioServ.putConsultorio(this.idN, body).subscribe(
      res => {
        // this.data = res;
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

  async postData(body) {
    try {
      this.data = await this.consultorioServ
      .postConsultorio(body)
      .toPromise();

      this.errors = null;
      this.add = true;
      setTimeout(() => {
        this.add = false;
        this.router.navigate(['panel/consultorios']);
      }, 2000);

    } catch (err) {
      this.errors = err.error.errors.message;
    }
  }

  async delData() {
    try {
      this.data = await this.consultorioServ
      .delConsultorio(this.idN)
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
}
