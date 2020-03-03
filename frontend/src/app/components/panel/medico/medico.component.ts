import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicosService } from 'src/app/services/medicos.service';

@Component({
  selector: 'app-medic',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  message: FormGroup;
  idN: any;

  data: any;
  edit: boolean;
  delete: boolean;
  add: boolean;
  errors: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private medicsServ: MedicosService,
    private router: Router
  ) {}

  ngOnInit() {

    this.idN = this.route.snapshot.params.id;

    if (!this.idN) {
      this.message = this.fb.group({
        medicos: this.fb.group({
          nombres: ['', Validators.required],
          apellido: ['', Validators.required],
          celular: ['', Validators.required],
          email: ['', Validators.required]
        }),
      }, { updateOn: 'blur' });  // updateOn cambia la frecuencia en que se validan los inputs
    } else {

      this.getOne(this.idN);

      this.message = this.fb.group({
        medicos: this.fb.group({
          nombres: '',
          apellido: '',
          celular: '',
          email: '',
        }),
      }, { updateOn: 'blur' });  // updateOn cambia la frecuencia en que se validan los inputs
    }
  }

// SUBMIT METHODS----------------------------------------------------------
  onSubmit() {
    // agregar metodo que le pega a la api POST
    console.log(this.message.value.medicos);
    this.postData(this.message.value.medicos);
  }
  onSubmitId() {
    // agregar metodo que le pega a la api PUT
    this.putData(this.message.value.medicos);
  }
  deleteCons() {
    this.delData();
  }
// SUBMIT METHODS----------------------------------------------------------


// CRUD METHODS------------------------------------------------------------
  getOne(id) {

    this.medicsServ.getOneMedico(id).subscribe(
      res => {
        this.data = res;
        console.log(this.data);

        this.message = this.fb.group({
        medicos: this.fb.group({
          nombres: this.data.nombres,
          apellido: this.data.apellido,
          celular: this.data.celular,
          email: this.data.email,
        }),
      }, { updateOn: 'blur' });  // updateOn cambia la frecuencia en que se validan los inputs

      },
      err => this.errors = err.error.text
    );
  }

  putData(body) {

      this.medicsServ
      .putMedico(this.idN, body)
      .subscribe(
        res => {

      this.errors = null;
      this.edit = true;
      setTimeout(() => {
        this.edit = false;
        this.router.navigate(['panel/medics']);
      }, 2000);

      },
      err => this.errors = err.error.text
    );
  }

  postData(body) {

      this.medicsServ
      .postMedico(body)
      .subscribe(
        res => {

      this.errors = null;
      this.add = true;
      setTimeout(() => {
        this.add = false;
        this.router.navigate(['panel/medics']);
      }, 2000);

      },
      err => console.log(err)
    );
  }

  delData() {

      this.medicsServ.delMedico(this.idN).subscribe( res => {

      this.delete = true;
      setTimeout(() => {
        this.delete = false;
        this.router.navigate(['panel/medics']);
      }, 2000);

      },
      err => this.errors = err.error.text
    );
  }

// CRUD METHODS------------------------------------------------------------
}

