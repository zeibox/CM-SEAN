import { Component, OnInit} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomiciliosService } from '../../../services/domicilios.service';
import { DatePipe } from '@angular/common';
import { Domicilio } from '../../../interfaces/domicilios';
import { of } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { PaisesService } from '../../../services/paises.service';
import { LocalidadesService } from '../../../services/localidades.service';


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

  selectedPais: any;
  selectedPais2: any;
  selectedProvincia: any;
  selectedLocalidad: any;
  


  areaSelected: any;

  domicilio: Domicilio = {
    id_dom: 0,
    id_localidad: 1,
    id_user: 1,
    creado_en: new Date()
  };

  provincias: any;
  provinciasFiltradas = [];
  localidadesFiltradas= [];
  paises: any;
  localidades: any;

  test: any;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private domiciliosServ: DomiciliosService,
    private paisesService: PaisesService,
    private localidadesService: LocalidadesService,
    private router: Router
  ) {}

  ngOnInit() {

    this.formGroupFormat();
    this.getPaises();
    this.getProvincias();
    this.getLocalidades();
    this.idRute = this.route.snapshot.params.id;
    if (this.idRute) {
      this.getOne(this.idRute);
    }
  }

// SUBMIT METHODS----------------------------------------------------------
  onSubmit() {
    // agregar metodo que le pega a la api POST
    this.postData(this.formGroup.value.domicilios);
  }
  onSubmitId() {
    // agregar metodo que le pega a la api PUT
    this.putData(this.formGroup.value.domicilios);
  }
// SUBMIT METHODS----------------------------------------------------------


// CRUD METHODS------------------------------------------------------------

  getProvincias() {
    this.domiciliosServ.getProvincias().subscribe(
      res => {
        this.provincias = res;
        //console.log(res);
        this.filterObsProv();  // ejecuta obs al devolver res de provincias
      },
      err => this.errors = err.error.text
    );
  }

  getPaises() {
    this.paisesService.getPaises().subscribe(
      res => {
        this.paises = res;
        //console.log(res);
      }
    );
  }

  getLocalidades() {
    this.localidadesService.getLocalidades().subscribe(
      res => {
        this.localidades = res;
        this.filterObsLocalidad();  // ejecuta obs al devolver res de provincias
      
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
          id_domicilio: [{value: this.data.id_domicilio, disabled: true}],
          creado_en: [{value: this.datePipe.transform(this.data.creado_en, 'dd MMMM yyyy, HH:mm', '-600'), disabled: true}],
          calle: this.data.calle,
          nombre: this.data.nombre,
          //cod_postal: this.data.cod_postal,
          provincias: [{value: this.data.provincia, disabled: true}],
          paises: [{value: this.data.pais, disabled: true}],
        }),
      }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs
        // console.log(this.formGroup.value.domicilios);
    },
      err => this.errors = err.error.text
    );
  }

  putData(body) {
    console.log('como viene del form: ', body);
    console.log('data', this.data);
    // this.domicilio.id_dom = this.data.id_domicilio;
    // this.domicilio.calle = body.calle;
    // this.domicilio.numero= body.numero;
    // this.domicilio.piso= body.piso;
    // this.domicilio.dpto= body.dpto;
    // this.domicilio.cod_postal = body.cod_postal;
    // this.domicilio.telefono= body.telefono;
    
    //this.domicilio.creado_en = new Date();
    console.log('antes de mandarlo', this.domicilio);

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
    console.log('como viene del form: ', body);
    this.domicilio.calle = body.calle;
    this.domicilio.numero = body.numero;
    this.domicilio.piso = body.piso;
    this.domicilio.dpto = body.dpto;
    this.domicilio.cod_postal = body.cod_postal;
    this.domicilio.telefono = body.telefono;
    // // console.log('selected prov', this.selectedProv);
    // this.domicilio.id_provincia = this.selectedProv?this.selectedProv.id_provincia:this.domicilio.id_provincia;
    //this.domicilio.id_localidad = this.selectedLocalidad?this.selectedLocalidad.id_localidad:this.domicilio.id_localidad;
    
    console.log('antes de mandarlo: ', this.domicilio);

    // this.domiciliosServ.saveDomicilio(this.domicilio).subscribe(
    //     res => {
    //       // this.errors = null;
    //       this.add = true;
    //       setTimeout(() => {
    //         this.add = false;
    //         this.router.navigate(['panel/domicilios']);
    //       }, 1500);
    //     },
    //     err => this.errors = err.error.text
    // );
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
      domicilios: this.fb.group({
        id_dom: [{value: '', disabled: true}],
        calle: ['', Validators.required],
        numero: ['', Validators.required],
        piso: ['', Validators.required],
        dpto: ['', Validators.required],
        cod_postal: ['', Validators.required],
        telefono: ['', Validators.required],
        provincias: ['', Validators.required],
        paises: ['', Validators.required],
        localidades: ['', Validators.required],
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
     //console.log(this.provinciasFiltradas);
    if (this.provinciasFiltradas[0]) {
      //this.domicilio.id_localidad = this.provinciasFiltradas[0].id_provincia;
    }
     //console.log(this.domicilio);
  }

  filterObsLocalidad(provincia?) {
    this.localidadesFiltradas = [];
    const prueba = of (...this.localidades); // of hace obvservable al parametro y spread (...) lo desestructura
    prueba.pipe(
    filter(res => res.provincia === (provincia?provincia:'Buenos Aires'))) // filtra buscando equivalencias
    .subscribe(res => {
      this.localidadesFiltradas.push(res);
      //console.log(res);
    });
     //console.log(this.localidadesFiltradas);
    if (this.provinciasFiltradas[0]) {
      //this.domicilio.id_localidad = this.provinciasFiltradas[0].id_provincia;
    }
     //console.log(this.domicilio);
  }

  filterObsLocalidadSelected(item) {
    const prueba = of (...this.localidades); // of hace obvservable al parametro y spread (...) lo desestructura
    prueba.pipe(
    filter(res => res.nombre === item )) // filtra buscando equivalencias
    .subscribe(res => {
      this.selectedLocalidad = res;
      console.log(this.selectedLocalidad);
    });
  }

  getPaisSelected(item) {
    this.selectedPais = item.target.value; // captura la opcion seleccionada
    this.filterObsProv(this.selectedPais);
    //console.log(this.selectedPais);
  }

  getProvinciaSelected(item) {
    this.selectedProvincia = item.target.value; // captura la opcion seleccionada
    this.filterObsLocalidad(this.selectedProvincia);
    console.log(this.selectedProvincia);
  }

  getLocalidadSelected(item) { // captura la opcion seleccionada
    // console.log(this.selectedProv);
    this.filterObsLocalidadSelected(item.target.value);
  }
}
