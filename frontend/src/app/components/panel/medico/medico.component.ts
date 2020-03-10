import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicosService } from 'src/app/services/medicos.service';
import { DocumentosService } from '../../../services/documentos.service';
import { Documento } from '../../../interfaces/documentos';
import { GenerosService } from '../../../services/generos.service';
import { JerarquiasService } from '../../../services/jerarquias.service';
import { Jerarquia } from '../../../interfaces/jerarquias';
import { Genero } from '../../../interfaces/generos';
import { Medico } from '../../../interfaces/medicos';

@Component({
  selector: 'app-medic',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  formGroup: FormGroup;
  idN: any;
  data: any;

  documentos: Documento;
  jerarquias: Jerarquia;
  generos: Genero;
  medico: Medico;

  edit: boolean;
  delete: boolean;
  add: boolean;
  errors: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private medicsServ: MedicosService,
    private documentosService: DocumentosService,
    private generosService: GenerosService,
    private jerarquiasService: JerarquiasService,
    private router: Router
  ) {}

  ngOnInit() {

    this.idN = this.route.snapshot.params.id;

    if (!this.idN) {
      this.formGroup = this.fb.group({
        medico: this.fb.group({
          nombres: ['', Validators.required],
          apellido: ['', Validators.required],
          celular: ['', Validators.required],
          email: ['', Validators.required]
        }),
      }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs
    } else {

      this.getOne(this.idN);

      this.formGroup = this.fb.group({
        medico: this.fb.group({
          nombres: '',
          apellido: '',
          celular: '',
          email: '',
        }),
      }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs
    }
  }

// SUBMIT METHODS----------------------------------------------------------
  onSubmit() {
    console.log(this.formGroup.value.medico);
    this.postData(this.formGroup.value.medico);
  }
  onSubmitId() {
    this.putData(this.formGroup.value.medico);
  }
  deleteCons() {
    this.delData();
  }
// SUBMIT METHODS----------------------------------------------------------


// CRUD METHODS------------------------------------------------------------
  getInit() {
    this.documentosService.getDocumentos().subscribe( res => { res = this.documentos; });
    this.jerarquiasService.getJerarquias().subscribe( res => { res = this.jerarquias; });
    this.generosService.getGeneros().subscribe( res => { res = this.generos; });
  }

  getOne(id) {

    this.medicsServ.getOneMedico(id).subscribe(
      res => {
        this.data = res;
        console.log(this.data);

        this.formGroup = this.fb.group({
        medico: this.fb.group({
          nombres: this.data.nombres,
          apellido: this.data.apellido,
          celular: this.data.celular,
          email: this.data.email,
        }),
      }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs

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
formGroupFormatID() {
  this.formGroup = this.fb.group({
    medicos: this.fb.group({
      id_localidad: [{value: '', disabled: true}],
      creado_en: [{value: '', disabled: true}],
      nombre: ['', Validators.required],
      cod_postal: ['', Validators.required],
      provincias: ['', Validators.required],
      paises: [{value: '', disabled: true}]
    }),
  }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs
}

}

