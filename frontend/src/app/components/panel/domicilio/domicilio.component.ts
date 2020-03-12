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
import { DomiciliosService } from '../../../services/domicilios.service';
import { Domicilio } from '../../../interfaces/domicilios';


@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.component.html',
  styleUrls: ['./domicilio.component.css']
})
export class DomicilioComponent implements OnInit {

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
  selectedLoc: any;


  areaSelected: any;

  domicilio: Domicilio = {
    id_dom: 0,
    id_localidad: 1,
    id_user: 1,
    creado_en: new Date()
  };

  provincias: any;
  provinciasFiltradas = [];
  paises: any;
  //---
  localidades: any;
  localiddesFiltradas = [];


  test: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private localidadesServ: LocalidadesService,
    private paisesService: PaisesService,
    private router: Router,
    //asdfg
    private domiciliosServ: DomiciliosService,
  ) {}

  ngOnInit() {
    //this.getPaises();
    this.getProvincias();
    this.getLocalidades();
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
  //asdfg//
  getLocalidades() {
    this.localidadesServ.getLocalidades().subscribe(
      res => {
        this.localidades = res;
        this.filterObsLoc();  // ejecuta obs al devolver res de provincias
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
    this.domiciliosServ.getDomicilio(id).subscribe(
      res => {
        this.data = res;
        // console.log('get on init', this.data);

        this.formGroup = this.fb.group({
          domicilios: this.fb.group({
          id_dom: [{value: this.data.id_dom, disabled: true}],
          creado_en: [{value: this.datePipe.transform(this.data.creado_en, 'dd MMMM yyyy, HH:mm', '-600'), disabled: true}],
          calle: this.data.calle,
          numero: this.data.numero,
          piso: this.data.piso,
          dpto: this.data.dpto,
          id_localidad: this.data.id_localidad,
          cod_postal: this.data.cod_postal,
          telefono: this.data.telefono,
          imagen: this.data.imagen,
          latitud: this.data.latitud,
          longitud: this.data.longitud,
          localidades: [{value: this.data.localidad, disabled: true}],
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
    this.domicilio.id_dom = this.data.id_dom;
    this.domicilio.calle = body.calle;
    this.domicilio.numero = body.numero;
    this.domicilio.piso = body.piso;
    this.domicilio.dpto = body.dpto;
    this.domicilio.cod_postal = body.cod_postal;
    this.domicilio.telefono = body.telefono;
    this.domicilio.imagen = body.imagen;
    this.domicilio.latitud = body.latitud;
    this.domicilio.longitud = body.longitud;

    this.domicilio.creado_en = new Date();
    // console.log('antes de mandarlo', this.localidad);

    this.domiciliosServ.updateDomicilio(this.idRute, this.domicilio).subscribe(
      res => {
        this.edit = true;
        setTimeout(() => {
          this.edit = false;
          this.router.navigate(['panel/domicilios']);
        }, 1500);
      },
      err => this.errors = err.error.text
    );
  }

  postData(body) {
    // console.log('como viene del form: ', body);
    this.domicilio.calle = body.calle;
    this.domicilio.numero = body.numero;
    this.domicilio.piso = body.piso;
    this.domicilio.dpto = body.dpto;
    this.domicilio.cod_postal = body.cod_postal;
    this.domicilio.telefono = body.telefono;
    this.domicilio.imagen = body.imagen;
    this.domicilio.latitud = body.latitud;
    this.domicilio.longitud = body.longitud;
    // console.log('selected prov', this.selectedLoc);
    this.domicilio.id_localidad = this.selectedLoc?this.selectedLoc.id_localidad:this.domicilio.id_localidad;
    // console.log('antes de mandarlo: ', this.localidad);

    this.domiciliosServ.saveDomicilio(this.domicilio).subscribe(
        res => {
          // this.errors = null;
          this.add = true;
          setTimeout(() => {
            this.add = false;
            this.router.navigate(['panel/domicilios']);
          }, 1500);
        },
        err => this.errors = err.error.text
    );
  }

  delData() {
    // console.log(this.idRute);
    this.domiciliosServ.deleteDomicilio(this.idRute).subscribe(
      res => {
        this.delete = true;
        setTimeout(() => {
          this.delete = false;
          this.router.navigate(['panel/domicilios']);
        }, 1500);
      },
      err => this.errors = err.error.text
    );
  }

// CRUD METHODS------------------------------------------------------------

  formGroupFormat() {
    this.formGroup = this.fb.group({
      localidades: this.fb.group({
        id_dom: [{value: '', disabled: true}],
        creado_en: [{value: '', disabled: true}],
        calle: ['', Validators.required],
        numero: ['', Validators.required],
        piso: '',
        dpto: '',
        latitud: '',
        longitud: '',
        imagen: '',
        cod_postal: '',
        localidades: '',
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
        calle: ['', Validators.required],
        numero: ['', Validators.required],
        piso: [{value: '', disabled: true}],
        dpto: [{value: '', disabled: true}],
        latitud: [{value: '', disabled: true}],
        longitud: [{value: '', disabled: true}],
        imagen: [{value: '', disabled: true}],
        cod_postal: [{value: '', disabled: true}],
        localidades: [{value: '', disabled: true}],
        provincias: [{value: '', disabled: true}],
        paises: [{value: '', disabled: true}],
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
      this.selectedLoc = res;
      // console.log(this.selectedLoc);
    });
  }

  getPaisSelected(item) {
    this.selectedOption = item.target.value; // captura la opcion seleccionada
    this.filterObsProv(this.selectedOption);
  }

  getProvinciaSelected(item) { // captura la opcion seleccionada
    // console.log(this.selectedLoc);
    this.filterObsProvSelected(item.target.value);
  }
}

// filterObsLoc(provincia?){
//   this.localidadesFiltradas = [];
//   const prueba = of (...this.localidades); // of hace obvservable al parametro y spread (...) lo desestructura
//   prueba.pipe(
//   filter(res => res.provincia === (provincia?provincia:'Buenos Aires'))) // filtra buscando equivalencias
//   .subscribe(res => {
//     this.localidadesFiltradas.push(res);
//   });
//   // console.log(this.provinciasFiltradas);
//   if (this.localidadesFiltradas[0]) {
//     this.domicilio.id_localidad = this.localidadesFiltradas[0].id_localidad;
//   }
//   // console.log(this.localidad);
// }

// filterObsLocSelected(item) {
//   const prueba = of (...this.localidades); // of hace obvservable al parametro y spread (...) lo desestructura
//   prueba.pipe(
//   filter(res => res.nombre === item )) // filtra buscando equivalencias
//   .subscribe(res => {
//     this.selectedLoc = res;
//     // console.log(this.selectedLoc);
//   });
// }
