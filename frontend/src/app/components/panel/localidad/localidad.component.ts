import { Component, OnInit} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalidadesService } from '../../../services/localidades.service';
import { DatePipe } from '@angular/common';
import { Localidad } from '../../../interfaces/localidades';
import { AreasService } from '../../../services/areas.service';
import { of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { PaisesService } from '../../../services/paises.service';

@Component({
  selector: 'app-localidad',
  templateUrl: './localidad.component.html',
  styleUrls: ['./localidad.component.css']
})
export class LocalidadComponent implements OnInit {

  formGroup: FormGroup;
  datePipe = new DatePipe('es-AR');
  idRute: any;
  data: any;
  edit: boolean;
  delete: boolean;
  add: boolean;
  errors: string;

  selectedOption: any;
  selectedOption2: any;
  selectedProv: any;


  areaSelected: any;

  localidad: Localidad = {
    id_localidad: 0,
    id_provincia: 1,
    id_user: 1,
    creado_en: new Date()
  };

  provincias: any;
  provinciasFiltradas = [];
  paises: any;

  test: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private localidadesServ: LocalidadesService,
    private paisesService: PaisesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPaises();
    this.getProvincias();
    this.idRute = this.route.snapshot.params.id;
    if (this.idRute) {
      this.getOne(this.idRute);
      this.formGroupFormatID();
    } else {
      this.formGroupFormat();
    }
  }

// SUBMIT METHODS----------------------------------------------------------
  onSubmit() {
    // agregar metodo que le pega a la api POST
    this.postData(this.formGroup.value.localidades);
  }
  onSubmitId() {
    // agregar metodo que le pega a la api PUT
    this.putData(this.formGroup.value.localidades);
  }
// SUBMIT METHODS----------------------------------------------------------


// CRUD METHODS------------------------------------------------------------

  getProvincias() {
    this.localidadesServ.getProvincias().subscribe(
      res => {
        this.provincias = res;
        this.filterObsProv();  // ejecuta obs al devolver res de provincias
      },
      err => this.errors = err.error.text
    );
  }

  getPaises() {
    this.paisesService.getPaises().subscribe(
      res => {
        this.paises = res;
        // console.log(res);
      }
    );
  }

  getOne(id) {
    this.localidadesServ.getLocalidad(id).subscribe(
      res => {
        this.data = res;
        // console.log('get on init', this.data);

        this.formGroup = this.fb.group({
          localidades: this.fb.group({
          id_localidad: [{value: this.data.id_localidad, disabled: true}],
          creado_en: [{value: this.datePipe.transform(this.data.creado_en, 'dd MMMM yyyy, HH:mm', '-600'), disabled: true}],
          nombre: this.data.nombre,
          cod_postal: this.data.cod_postal,
          provincias: [{value: this.data.provincia, disabled: true}],
          paises: [{value: this.data.pais, disabled: true}],
        }),
      }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs
        // console.log(this.formGroup.value.localidades);
    },
      err => this.errors = err.error.text
    );
  }

  putData(body) {
    // console.log('como viene del form: ', body);
    // console.log('data', this.data);
    this.localidad.id_localidad = this.data.id_localidad;
    this.localidad.nombre = body.nombre;
    this.localidad.cod_postal = body.cod_postal;
    this.localidad.creado_en = new Date();
    // console.log('antes de mandarlo', this.localidad);

    this.localidadesServ.updateLocalidad(this.idRute, this.localidad).subscribe(
      res => {
        this.edit = true;
        setTimeout(() => {
          this.edit = false;
          this.router.navigate(['panel/localidades']);
        }, 1500);
      },
      err => this.errors = err.error.text
    );
  }

  postData(body) {
    // console.log('como viene del form: ', body);
    this.localidad.nombre = body.nombre;
    this.localidad.cod_postal = body.cod_postal;
    // console.log('selected prov', this.selectedProv);
    this.localidad.id_provincia = this.selectedProv?this.selectedProv.id_provincia:this.localidad.id_provincia;
    // console.log('antes de mandarlo: ', this.localidad);

    this.localidadesServ.saveLocalidad(this.localidad).subscribe(
        res => {
          // this.errors = null;
          this.add = true;
          setTimeout(() => {
            this.add = false;
            this.router.navigate(['panel/localidades']);
          }, 1500);
        },
        err => this.errors = err.error.text
    );
  }

  delData() {
    // console.log(this.idRute);
    this.localidadesServ.deleteLocalidad(this.idRute).subscribe(
      res => {
        this.delete = true;
        setTimeout(() => {
          this.delete = false;
          this.router.navigate(['panel/localidades']);
        }, 1500);
      },
      err => this.errors = err.error.text
    );
  }

// CRUD METHODS------------------------------------------------------------

  formGroupFormat() {
    this.formGroup = this.fb.group({
      localidades: this.fb.group({
        id_localidad: [{value: '', disabled: true}],
        creado_en: [{value: '', disabled: true}],
        nombre: ['', Validators.required],
        cod_postal: ['', Validators.required],
        provincias: '',
        paises: ''
      }),
    }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs
  }

  formGroupFormatID() {
    this.formGroup = this.fb.group({
      localidades: this.fb.group({
        id_localidad: [{value: '', disabled: true}],
        creado_en: [{value: '', disabled: true}],
        nombre: ['', Validators.required],
        cod_postal: ['', Validators.required],
        provincias: [{value: '', disabled: true}],
        paises: [{value: '', disabled: true}]
      }),
    }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs
  }

  filterObsProv(pais?) {
    this.provinciasFiltradas = [];
    const prueba = of (...this.provincias); // of hace obvservable al parametro y spread (...) lo desestructura
    prueba.pipe(
    filter(res => res.pais === (pais?pais:'Argentina'))) // filtra buscando equivalencias
    .subscribe(res => {
      this.provinciasFiltradas.push(res);
    });
    // console.log(this.provinciasFiltradas);
    if (this.provinciasFiltradas[0]) {
      this.localidad.id_provincia = this.provinciasFiltradas[0].id_provincia;
    }
    // console.log(this.localidad);
  }

  filterObsProvSelected(item) {
    const prueba = of (...this.provincias); // of hace obvservable al parametro y spread (...) lo desestructura
    prueba.pipe(
    filter(res => res.nombre === item )) // filtra buscando equivalencias
    .subscribe(res => {
      this.selectedProv = res;
      // console.log(this.selectedProv);
    });
  }

  getPaisSelected(item) {
    this.selectedOption = item.target.value; // captura la opcion seleccionada
    this.filterObsProv(this.selectedOption);
  }

  getProvinciaSelected(item) { // captura la opcion seleccionada
    // console.log(this.selectedProv);
    this.filterObsProvSelected(item.target.value);
  }
}
