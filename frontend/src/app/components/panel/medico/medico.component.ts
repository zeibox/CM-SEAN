import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicosService } from 'src/app/services/medicos.service';
import { DocumentosService } from '../../../services/documentos.service';
import { GenerosService } from '../../../services/generos.service';
import { JerarquiasService } from '../../../services/jerarquias.service';
import { Medico } from '../../../interfaces/medicos';
import { filter } from 'rxjs/operators';
import { of, Observable, forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-medic',
  templateUrl: './medico.component.html',
  styleUrls: ['./medico.component.css']
})
export class MedicoComponent implements OnInit {

  formGroup: FormGroup;
  idRute: any;
  data: any;
  obs: Observable<any>;
  datePipe = new DatePipe('es-AR');

  documentos: any;
  selectedDocumento: any;
  jerarquias: any;
  selectedJerarquia: any;
  generos: any;
  selectedGenero: any;
  datosBasicos = true;
  especialidades = true;


  medico: Medico = {
    imagen: 'https://clipartart.com/images/doctor-icon-clipart-3.png',
    nombres: '',
    apellido: '',
    celular: '',
    email: '',
    cuit: '',
    matricula: '',
    numero: '',
    fe_ingreso: new Date(),
    vto_acuerdo: new Date(),
    creado_en: new Date(),
    id_jerarquia: 2,
    id_documento_tipo: 1,
    id_genero: 4,
    id_medico: 0,
    id_user: 1
  };

  edit: boolean;
  delete: boolean;
  add: boolean;
  errors: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private medicoServ: MedicosService,
    private documentosService: DocumentosService,
    private generosService: GenerosService,
    private jerarquiasService: JerarquiasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.idRute = this.route.snapshot.params.id;
    this.formGroupFormat();
    // this.getDocumentos();
    // this.getGeneros();
    // this.getJerarquias();
    this.forkJoin();
    // this.getOne(this.idRute);
  }

// SUBMIT METHODS----------------------------------------------------------
  onSubmit() { this.postData(this.formGroup.value.medicos); }
  onSubmitId() { this.putData(this.formGroup.value.medicos); }
// SUBMIT METHODS----------------------------------------------------------

// CRUD METHODS------------------------------------------------------------
  forkJoin() {
    forkJoin(this.generosService.getGeneros(), this.jerarquiasService.getJerarquias(), this.documentosService.getDocumentos()).subscribe(
      res => {
        // console.log(res);
        this.generos = res[0];
        this.jerarquias = res[1];
        this.documentos = res[2];
      },
      err => { this.errors = err.error.text; },
      () => {
        if (this.idRute) { this.getOne(this.idRute); }
      });
  }

  getOne(id) {
    this.medicoServ.getOneMedico(id).subscribe(
      res => {
        this.data = res;
        this.formGroup = this.fb.group({
          medicos: this.fb.group({
            nombres: this.data.nombres,
            apellido: this.data.apellido,
            celular: this.data.celular,
            email: this.data.email,
            tipo_doc: this.data.documento,
            numero_doc: this.data.numero,
            cuit: this.data.cuit,
            matricula: this.data.matricula,
            genero: this.data.genero,
            jerarquia: this.data.jerarquia,
            vto_acuerdo: this.datePipe.transform(this.data.vto_acuerdo, 'yyyy-MM-dd')
          }),
        }, { updateOn: 'change' });
      },
      err => {this.errors = err.error.text; },
      () => {
        // console.log('finish get');
      }
    );
  }

  putData(body) {
    console.log('Datos del form: ', body);
    this.medico.id_medico = this.data.id_medico; // data es el objeto obtenido del get on init
    this.medicoData(body);
    // ID: si hay campos seleccionados en combo-box utiliza esos valores, si no utliza el valor de DATA
    this.medico.id_documento_tipo = this.selectedDocumento?this.selectedDocumento.id_documento_tipo:this.data.id_documento_tipo;
    this.medico.id_genero = this.selectedGenero?this.selectedGenero.id_genero:this.data.id_genero;
    this.medico.id_jerarquia = this.selectedJerarquia?this.selectedJerarquia.id_jerarquia:this.data.id_jerarquia;
    console.log('Datos a enviar: ', this.medico);
    this.medicoServ.putMedico(this.idRute, this.medico).subscribe(
      res => {
        this.edit = true;
        setTimeout(() => {
          this.edit = false;
          this.router.navigate(['panel/medicos']);
        }, 1500);
      },
      err => this.errors = err.error.text
    );
  }

  postData(body) {
    console.log('Datos del form: ', body);
    this.medicoData(body);
    // ID: si hay campos seleccionados en combo-box utiliza esos valores, si no utliza el valor del primer objeto.
    this.medico.id_documento_tipo = this.selectedDocumento?this.selectedDocumento.id_documento_tipo:this.documentos[0].id_documento_tipo;
    this.medico.id_genero = this.selectedGenero?this.selectedGenero.id_genero:this.generos[0].id_genero;
    this.medico.id_jerarquia = this.selectedJerarquia?this.selectedJerarquia.id_jerarquia:this.jerarquias[0].id_jerarquia;
    console.log('Datos a enviar: ', this.medico);
    this.medicoServ.postMedico(this.medico).subscribe(
      res => {
        this.add = true;
        setTimeout(() => {
          this.add = false;
          this.router.navigate(['panel/medicos']);
        }, 1500);
      },
      err => this.errors = err.error.text
    );
    console.log(this.errors);
  }

  delData() {
      this.medicoServ.delMedico(this.idRute).subscribe( res => {
        this.delete = true;
        setTimeout(() => {
          this.delete = false;
          this.router.navigate(['panel/medicos']);
        }, 1500);
      },
      err => this.errors = err.error.text
    );
  }

// CRUD METHODS------------------------------------------------------------

  filterObsSelected(item) {
    // of hace obvservable al parametro y spread (...) lo desestructura
    if (item.target.title === 'genero') {
      this.obs = of (...this.generos); // Si el titulo del select es igual a 'x', obs a utilizar = 'x'
    } else if ( item.target.title === 'tipoDoc') {
      this.obs = of (...this.documentos); // Si el titulo del select es igual a 'x', obs a utilizar = 'x'
    } else { this.obs = of (...this.jerarquias); } // Si el titulo del select es igual a 'x', obs a utilizar = 'x'

    this.obs.pipe(
    filter(res => res.nombre === item.target.value )) // filtra buscando equivalencias
    .subscribe(res => {
      if (item.target.title === 'genero') { // Si el titulo del select es igual a 'x', objeto seleccionado = 'x'
        this.selectedGenero = res;
      } else if ( item.target.title === 'tipoDoc') { // Si el titulo del select es igual a 'x', objeto seleccionado = 'x'
        this.selectedDocumento = res;
      } else { this.selectedJerarquia = res; } // Si el titulo del select es igual a 'x', objeto seleccionado = 'x'
    });
  }

  medicoData(body) {
    this.medico.nombres = body.nombres;
    this.medico.apellido = body.apellido;
    this.medico.celular = body.celular;
    this.medico.cuit = body.cuit;
    this.medico.email = body.email;
    this.medico.matricula = body.matricula;
    this.medico.numero = body.numero_doc;
    this.medico.vto_acuerdo = body.vto_acuerdo;
  }

  formGroupFormat() {
    this.formGroup = this.fb.group({
      medicos: this.fb.group({
        nombres: ['', Validators.required],
        apellido: ['', Validators.required],
        email: ['', Validators.required],
        celular: ['', Validators.required],
        tipo_doc: ['', Validators.required],
        numero_doc: ['', Validators.required],
        cuit: ['', Validators.required],
        matricula: ['', Validators.required],
        genero: ['', Validators.required],
        jerarquia: ['', Validators.required],
        vto_acuerdo: ['', Validators.required]
      }),
    }, { updateOn: 'change' });
  }

  getSelected(item) {
    // console.log(item);
    this.filterObsSelected(item);
  }

  hideForm(item) {
    if (item.target.title === 'datosBasicos') { this.datosBasicos = !this.datosBasicos; }
    if (item.target.title === 'especialidades') { this.especialidades = !this.especialidades; }
  }

}

