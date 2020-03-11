import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicosService } from 'src/app/services/medicos.service';
import { DocumentosService } from '../../../services/documentos.service';
import { GenerosService } from '../../../services/generos.service';
import { JerarquiasService } from '../../../services/jerarquias.service';
import { Medico } from '../../../interfaces/medicos';
import { filter } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

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

  documentos: any;
  selectedDocumento: any;
  jerarquias: any;
  selectedJerarquia: any;
  generos: any;
  selectedGenero: any;


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
    private medicsServ: MedicosService,
    private documentosService: DocumentosService,
    private generosService: GenerosService,
    private jerarquiasService: JerarquiasService,
    private router: Router
  ) {}

  ngOnInit() {
    this.idRute = this.route.snapshot.params.id;
    this.getInit();
    this.formGroupFormat();
    if (this.idRute) { this.getOne(this.idRute); }
  }

// SUBMIT METHODS----------------------------------------------------------
  onSubmit() { this.postData(this.formGroup.value.medicos); }
  onSubmitId() { this.putData(this.formGroup.value.medicos); }
// SUBMIT METHODS----------------------------------------------------------

// CRUD METHODS------------------------------------------------------------
  getInit() {
    this.documentosService.getDocumentos().subscribe( res => { this.documentos = res; });
    this.jerarquiasService.getJerarquias().subscribe( res => { this.jerarquias = res; });
    this.generosService.getGeneros().subscribe( res => { this.generos = res; });
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
      .putMedico(this.idRute, body)
      .subscribe(
        res => {
      this.errors = null;
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
    this.medico.nombres = body.nombres;
    this.medico.apellido = body.apellido;
    this.medico.celular = body.celular;
    this.medico.cuit = body.cuit;
    this.medico.email = body.email;
    this.medico.matricula = body.matricula;
    this.medico.numero = body.numero_doc;
    // ID: si hay campos seleccionados en los combo-box utiliza esos valores, si no utliza el valor del primer objeto.
    this.medico.id_documento_tipo = this.selectedDocumento?this.selectedDocumento.id_documento_tipo:this.documentos[0].id_documento_tipo;
    this.medico.id_genero = this.selectedGenero?this.selectedGenero.id_genero:this.generos[0].id_genero;
    this.medico.id_jerarquia = this.selectedJerarquia?this.selectedJerarquia.id_jerarquia:this.jerarquias[0].id_jerarquia;
    console.log('Datos a enviar: ', this.medico);
    this.medicsServ.postMedico(this.medico).subscribe(
      res => {
        this.errors = null;
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
      this.medicsServ.delMedico(this.idRute).subscribe( res => {
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
        jerarquia: ['', Validators.required]
      }),
    }, { updateOn: 'change' });
  }

  getSelected(item) {
    // console.log(item);
    this.filterObsSelected(item);
  }

}

