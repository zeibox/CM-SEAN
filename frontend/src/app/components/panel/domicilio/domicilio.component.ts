import { Component, OnInit, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DomiciliosService } from '../../../services/domicilios.service';
import { DatePipe } from '@angular/common';
import { Domicilio } from '../../../interfaces/domicilios';
import { of, forkJoin } from 'rxjs';
import { filter, tap, finalize } from 'rxjs/operators';
import { PaisesService } from '../../../services/paises.service';
import { LocalidadesService } from '../../../services/localidades.service';
import { MedicosDomiciliosService } from '../../../services/medicos-domicilios.service';
import { Medico, MedicoDomicilio } from '../../../interfaces/medicos';


@Component({
  selector: 'app-domicilio',
  templateUrl: './domicilio.component.html',
  styleUrls: ['./domicilio.component.css']
})
export class DomicilioComponent implements OnInit {

  @Input() newMedico: Medico;
  newDom: any;

  formGroup: FormGroup;
  datePipe = new DatePipe('es-AR');
  idRute: any;
  data: any;
  edit: boolean;
  delete: boolean;
  add: boolean;
  errors: string;

  medicosDomicilios: any;
  selectedPais: any;
  selectedProvincia: any;
  selectedLocalidad: any;
  selectedDomicilio: any;
  paises: any;
  provincias: any;
  localidades: any;
  provinciasFiltradas = [];
  localidadesFiltradas = [];
  filter: any;
  cont = 0;
  rute: any;
  ruteMedico = false;

  domicilio: Domicilio = {
    id_dom: 0,
    id_user: 1,
    creado_en: new Date()
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private domiciliosServ: DomiciliosService,
    private paisesService: PaisesService,
    private localidadesService: LocalidadesService,
    private router: Router,
    private medicoDomServ: MedicosDomiciliosService
  ) {}

  ngOnInit() {
    console.log('medico creado', this.newMedico);
    this.rute = this.route.snapshot.component;
    this.idRute = this.route.snapshot.params.id;
    if (this.rute.name === 'MedicoComponent') {
      this.ruteMedico = true;  // ngIf en template dependiendo de que componente se ejecute
      if (!this.newMedico) {  // si es undefined trae medicosDomicilios (modo actualizar)
        this.getMedicosDomicilios();
      } else { this.getPaisProvDom(); } //
      // get medicos_domicilios (obtener id_dom)
    } else if (this.idRute) {
      this.getOne(this.idRute); // Almacena los datos del domicilio en variable 'data'
    } else { this.getPaisProvDom(); }
    this.formGroupFormat(); // Formateo del formGroup necesario al hacer OnInit
  }

// SUBMIT METHODS----------------------------------------------------------
  onSubmit() {
    this.postData(this.formGroup.value.domicilios);
    // if (this.rute.name === 'MedicoComponent') { this.postMedicoDomicilio(); }
  }
  onSubmitId() {
    this.putData(this.formGroup.value.domicilios);
  }
// SUBMIT METHODS----------------------------------------------------------

// CRUD METHODS------------------------------------------------------------

  getPaisProvDom() {
    forkJoin(this.paisesService.getPaises(), this.domiciliosServ.getProvincias(), this.localidadesService.getLocalidades()).subscribe(
      res => {
        this.paises = res[0];
        this.provincias = res[1];
        this.localidades = res[2];
      },
      err => { this.errors = err.error.text; },
      () => {
        this.filterObsProvincia();  // Una vez completado el forkJoin llama al obs que filtra las provincias
      });
  }

  getOne(id) {
    this.domiciliosServ.getDomicilio(id).pipe(finalize(() => this.getPaisProvDom() )).subscribe(
      res => { this.data = res; });
  }

  putData(body) {
    // console.log('como viene del form: ', body);
    this.domicilio.id_localidad = this.selectedLocalidad?this.selectedLocalidad.id_localidad:this.data.id_localidad;
    this.domicilio.id_user = this.data.id_user;
    this.domicilio.id_dom = this.data.id_dom;
    this.domicilio.calle = body.calle;
    this.domicilio.numero = body.numero;
    this.domicilio.piso = body.piso;
    this.domicilio.dpto = body.dpto;
    this.domicilio.cod_postal = body.cod_postal;
    this.domicilio.telefono = body.telefono;
    this.domicilio.creado_en = new Date();
    // Si estamos en el componente medicos y entramos para actualizar (validacion linea 69)
    let paramID;
    if (this.selectedDomicilio) { paramID = this.selectedDomicilio.id_dom; } else { paramID = this.idRute; }
    // console.log('antes de mandarlo', this.domicilio);
    this.domiciliosServ.updateDomicilio(paramID, this.domicilio).subscribe(
      res => {
        this.edit = true;
        console.log(res);
        setTimeout(() => {
          this.edit = false;
          // this.router.navigate(['panel/domicilios']);
        }, 1500);
      },
      err => this.errors = err
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
    this.domicilio.id_localidad = this.selectedLocalidad?this.selectedLocalidad.id_localidad:this.localidadesFiltradas[0].id_localidad;
    // console.log('antes de mandarlo: ', this.domicilio);
    this.domiciliosServ.saveDomicilio(this.domicilio).subscribe(
        res => {
          const idDom = (Object.values({...res}));  // Res devuelve el id del obj recien creado, object.values devuelve el valor numerico
          if (this.newMedico) { this.newDom = { id_medico: this.newMedico[0], id_dom: idDom[0] }; }
          // this.newMedico = id del medico creado en datos basicos
          this.add = true;
          setTimeout(() => {
            this.add = false;
            // this.router.navigate(['panel/domicilios']);
          }, 1500);
        },
        err => { this.errors = err.error.text; },
        () => {
          console.log(this.newDom);
          if (this.newMedico) { this.postMedicoDomicilio(this.newDom); }  // Manda como parametro newDom para crear medicosDomicilios
        });
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
      err => this.errors = err
    );
  }

  getMedicosDomicilios() {
    this.medicoDomServ.getMedicosDomicilios().subscribe(
      res => {
        this.medicosDomicilios = res;
        console.log(this.medicosDomicilios);
      },
      err => { this.errors = err.error.text; },
      () => {
        this.filterObsMedicosDom(this.idRute);
      });
  }

  postMedicoDomicilio(dom) {
    // capturar el id del medico creado en datos basicos y el id creado en el post de domicilios
    this.medicoDomServ.postMedicoDomicilio(dom).subscribe(
      res => {
        this.add = true;
        setTimeout(() => {
          this.add = false;
        }, 1500);
      }
    );
  }

// CRUD METHODS------------------------------------------------------------

  fillFormWithData() {
    this.formGroup = this.fb.group({
      domicilios: this.fb.group({
        id_domicilio: this.data.id_dom,
        calle: this.data.calle,
        numero: this.data.numero,
        piso: this.data.piso,
        dpto: this.data.dpto,
        id_localidad: this.data.id_localidad,
        id_user: this.data.id_user,
        telefono: this.data.telefono,
        cod_postal: this.data.cod_postal,
        provincias: this.data.provincia,
        paises: this.data.pais,
        localidades: this.data.localidad
      }),
    }, { updateOn: 'change' });  // updateOn cambia la frecuencia en que se validan los inputs
  }

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

  filterObsProvincia(pais?) {
    this.provinciasFiltradas = [];
    const prueba = of (...this.provincias); // of hace obvservable al parametro y spread (...) lo desestructura
    prueba.pipe(
    filter(res => res.pais === (pais?pais:this.paises[0].nombre))) // Si hay parametro, usarlo, sino usar valor de la 1er posicion
    .subscribe(res => {
      this.provinciasFiltradas.push(res);
    },
    err => { this.errors = err; },
    () => {  // Al finalizar el obs ejecuta validaciones necesarias para filtrar las localidades
      if (this.provinciasFiltradas[0] == null) {  // == null (pregunta si es null or undefined)
        this.localidadesFiltradas = []; // si no hay provincias, localidades = []
      } else {
        if (this.idRute && this.cont === 0 && this.data) { // contador por defecto = 0, 1ra vez que ingresa al metodo
          this.filter = this.data.provincia; // Si es la 1ra vez, toma el valor de data - getOne()
        } else { this.filter = this.provinciasFiltradas[0].nombre; } // Si no es la 1ra, toma el valor de la 1er pos
        this.filterObsLocalidad();
      }
    });
  }

  filterObsLocalidad(provincia?) {
    this.cont++; // Contador necesario para capturar la 1ra vez que se ingresa al metodo
    this.localidadesFiltradas = [];
    const prueba = of (...this.localidades); // of hace obvservable al parametro y spread (...) lo desestructura
    prueba.pipe(
    filter(res => res.provincia === (provincia?provincia:this.filter))) // filtra buscando equivalencias
    .subscribe(res => {
      this.localidadesFiltradas.push(res);
    },
    err => { console.log(err); },
    () => {
      if (this.idRute && this.cont === 1 && this.data) { // Al completarse el obs, si hay ID y es la 1ra vez que ingresa, llena el formGroup
        setTimeout(() => {
          this.fillFormWithData();
        }, 10);
      }
    });
}

  filterObsLocalidadSelected(item) {
    const prueba = of (...this.localidades); // of hace obvservable al parametro y spread (...) lo desestructura
    prueba.pipe(
    filter(res => res.nombre === item )) // filtra buscando equivalencias
    .subscribe(res => {
      this.selectedLocalidad = res;
    });
  }

  filterObsMedicosDom(item?) {
    const prueba = of (...this.medicosDomicilios); // of hace obvservable al parametro y spread (...) lo desestructura
    prueba.pipe(
    filter(res => res.id_medico.toString() === item )) // filtra buscando equivalencias
    .subscribe(res => {
      this.selectedDomicilio = res;
      console.log('selected domicilio', this.selectedDomicilio);
    },
    err => { console.error(err); },
    () => {
      if (this.selectedDomicilio) {
        this.getOne(this.selectedDomicilio.id_dom);
      } else {
        this.getPaisProvDom();
      }
    });
}

  getPaisSelected(item) { // captura la opcion seleccionada
    this.selectedPais = item.target.value;
    this.filterObsProvincia(this.selectedPais);
    if (this.idRute) { this.data.id_localidad = this.localidadesFiltradas[0].id_localidad; }
  }

  getProvinciaSelected(item) { // captura la opcion seleccionada
    this.selectedProvincia = item.target.value;
    this.filterObsLocalidad(this.selectedProvincia);
    if (this.idRute) { this.data.id_localidad = this.localidadesFiltradas[0].id_localidad; }
  }

  getLocalidadSelected(item) { // captura la opcion seleccionada
    // console.log('localidad', item.target.value);
    this.filterObsLocalidadSelected(item.target.value);
  }
}
