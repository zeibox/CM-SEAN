import { Component, OnInit, ViewEncapsulation, Input} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Time } from '@angular/common';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { MedicoEspecialidad, Medico } from '../../../interfaces/medicos';
import { MedicosEspecialidadesService } from '../../../services/medicos-especialidades.service';
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-medico-especialidad',
  templateUrl: './medico-especialidad.component.html',
  styleUrls: ['./medico-especialidad.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MedicoEspecialidadComponent implements OnInit {

  @Input() newMed: any;

  idRute: any;
  edit: boolean;
  delete: boolean;
  add: boolean;
  errors: string;

  // Locale importado manualmente, revisar app module (localeEsAr, LOCALE_ID, registerLocaleData y providers)
  datePipe = new DatePipe('es-AR');

  formGroup: FormGroup;
  especialidades: any;
  medicosEspecialidades: any;
  createdEspecialidad: any;
  medEspecialidad: MedicoEspecialidad = {
    id_medico: 0,
    id_especialidad: 0,
    horarios: ''
  };
  data: any;
  horarios: any;

  selectedDias: Array<any>;
  isDiasClosed: boolean;
  diasFiltrados: any;
  selectedTurno: any;

  horariosArr = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
  horariosPrueba: any;

  final = [];

  horariosTable = [null, null, null, null, null, null, null];

  dias = [
    {nombre: 'lunes', mañana: 0, tarde: 1},
    {nombre: 'martes', mañana: 2, tarde: 3},
    {nombre: 'miercoles', mañana: 4, tarde: 5},
    {nombre: 'jueves', mañana: 6, tarde: 7},
    {nombre: 'viernes', mañana: 8, tarde: 9},
    {nombre: 'sabado', mañana: 10, tarde: 11},
    {nombre: 'domingo', mañana: 12, tarde: 13},
  ];

  constructor(
    private formBuilder: FormBuilder,
    // private router: Router,
    private datosRec: ActivatedRoute,
    private especialidadServ: EspecialidadesService,
    private medEspServ: MedicosEspecialidadesService) {}

  ngOnInit() {
    // this.getJerarquia();
    // this.pushEsp();
    // this.getMedEspecialidades();
    console.log(this.newMed);
    this.getHorarios();
    this.getEspecialidades();
    this.idRute = this.datosRec.snapshot.params.id;

    if (this.idRute) {
      this.getMedEspecialidad(this.idRute);
    }
    this.formGroupFormat(); // formateo del formGroup obligatorio
  }

  onSubmit() {
    this.postMedEspecialidad(this.formGroup.value.medEspecialidad);
    // this.formGroup.patchValue({
    //   medEspecialidad: ({
    //     mañana : 21
    //   })
    // });
  }
  onSubmitId() {
    this.putMedEspecialidad(this.formGroup.value.medEspecialidad);
  }

  getEspecialidades() {
    this.especialidadServ.getEspecialidades().subscribe(
      res => {
        this.especialidades = res;
        // console.log('especialidades', this.especialidades);
      },
      err => console.error(err)
    );
  }

  getHorarios() {
    this.medEspServ.getHorarios().subscribe(
      res => {
        this.horarios = res;
        this.horarios.unshift({inicio: 'Seleccionar', turno: 'm'}, {inicio: 'Seleccionar', turno: 't'});
        console.log('horarios', this.horarios);
        // console.log('horarios', this.horarios);
      },
      err => console.error(err)
    );
  }

  pushEsp(horarios, especialidad) {
    for (let i = 0; i < horarios.length; i++) {
      if (horarios[i] !== '0') {  // si en la posicion correspondiente al indice no hay un '0', ingresa
        // console.log('indice', i);
        // Detecta que en que posicion esta del arreglo y si el dia ya fué asignado en su posicion correspondiente
        if ( (i === 0 || i === 1) && this.horariosTable[0] == null) { this.horariosTable[0] = 'Lunes'; }
        if ( (i === 2 || i === 3) && this.horariosTable[1] == null) { this.horariosTable[1] = 'Martes'; }
        if ( (i === 4 || i === 5) && this.horariosTable[2] == null) { this.horariosTable[2] = 'Miercoles'; }
        if ( (i === 6 || i === 7) && this.horariosTable[3] == null) { this.horariosTable[3] = 'Jueves'; }
        if ( (i === 8 || i === 9) && this.horariosTable[4] == null) { this.horariosTable[4] = 'Viernes'; }
        if ( (i === 10 || i === 11) && this.horariosTable[5] == null) { this.horariosTable[5] = 'Sabado'; }
        if ( (i === 12 || i === 13) && this.horariosTable[6] == null) { this.horariosTable[6] = 'Domingo'; }
      }
    }
    // Elimina del arreglo las posiciones nulas
    this.horariosTable = this.horariosTable.filter(element => element != null);
    this.horariosPrueba = horarios.filter(element => element !== '0');
    // console.log(this.horariosPrueba);
    const test = {
      Especialidad: especialidad,
      Dias:  this.horariosTable,
      Horarios: [this.horariosPrueba[0], this.horariosPrueba[1]]
    };
    this.final.push(test);
    this.horariosTable = [null, null, null, null, null, null, null];
    //                 falta reemplazar el ID de especialidad por el Nombre y el ID de Horario por el horario.
    // console.log(this.final);
  }


  postMedEspecialidad(body) {
    // console.log(body.especialidad);
    this.medEspecialidad.id_especialidad = body.especialidad;
    this.medEspecialidad.id_medico = this.newMed[0];
    this.medEspecialidad.horarios = this.horariosArr.join('');
    console.log('antes de mandar: ', this.medEspecialidad);
    this.medEspServ.saveMedEspecialidad(this.medEspecialidad).subscribe(
        res => {
          this.pushEsp(this.horariosArr, body.especialidad);  // 1
          this.add = true;
          console.log('fg', this.formGroup);
          this.formGroup.reset();
          this.formGroup.value.medEspecialidad.mañana = 'Seleccionar';
          setTimeout(() => {
          this.add = false;
          // this.router.navigate(['panel/']);
        }, 1500);
      },
      err => { this.errors = err; },
      () => {
        this.getMedEspecialidades(); // 2
      });
  }

  putMedEspecialidad(body: MedicoEspecialidad) {
    // parametro this.idRute no va!!!! va el id_medico, traido como input desde el componente medico.
    this.medEspServ.updateMedEspecialidad(this.idRute, body).subscribe(
      res => {
        this.edit = true;
        setTimeout(() => {
          this.edit = false;
          // this.router.navigate(['panel/']);
        }, 1500);
      },
      err => console.log(err)
    );
  }

  deleteMedEspecialidad() {
    // parametro this.idRute no va!!!! va el id_medico, traido como input desde el componente medico.
    this.medEspServ.deleteMedEspecialidad(this.idRute).subscribe(
      res => {
        this.delete = true;
        setTimeout(() => {
          this.delete = false;
          // this.router.navigate(['panel/']);
        }, 1500);
      },
      err => { this.errors = err; }
    );
  }

  getMedEspecialidades() {
    this.medEspServ.getMedEspecialidades().subscribe(
      res => {
        this.medicosEspecialidades = res;
        // this.createdEspecialidad = res[0].horarios.split('');
        console.log('target', res);
        this.filterMedEspecialidad();
      },
      err => console.error(err)
    );
  }

  getMedEspecialidad(id) {
    // parametro this.idRute no va!!!! va el id_medico, traido como input desde el componente medico.
    this.medEspServ.getMedEspecialidad(id).subscribe(
      res => {
        this.data = res;
      },
      err => console.error(err)
    );
  }

  formGroupFormat() {
    this.formGroup = this.formBuilder.group({
      medEspecialidad: this.formBuilder.group({
        especialidad: ['', Validators.required],
        dia: ['', Validators.required],
        mañana: ['', Validators.required],
        tarde: ['', Validators.required]
      }),
    }, { updateOn: 'change' });
  }

  filterObsDias(dias?) {
    this.diasFiltrados = [];
    const prueba = of (...this.dias);
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.selectedDias.length; i++) {
      prueba.pipe(
        filter(res => res.nombre === dias[i]))
        .subscribe(res => {
          this.diasFiltrados.push(res);
        },
        err => { this.errors = err; },
        () => { });
    }
    // console.log('Dias filtrados: ', this.diasFiltrados);
    if (this.selectedTurno) { this.setHorariosEsp(); }
  }

  filterMedEspecialidad(id?) {
    const prueba = of (...this.medicosEspecialidades);
    prueba.pipe(
        filter(res => res.id_medico === this.newMed[0]))
        .subscribe(res => {
          console.log('filtradas', res);
        },
        err => { this.errors = err; },
        () => {console.log('caca', this.newMed); });
  }

  setHorariosEsp() {
    this.horariosArr = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
    if (this.formGroup.value.medEspecialidad.mañana) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.diasFiltrados.length; i++) {
        this.horariosArr[this.diasFiltrados[i].mañana] = this.formGroup.value.medEspecialidad.mañana;
      }
    }
    if (this.formGroup.value.medEspecialidad.tarde) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.diasFiltrados.length; i++) {
        this.horariosArr[this.diasFiltrados[i].tarde] = this.formGroup.value.medEspecialidad.tarde;
      }
    }
    // console.log('horarios usando join(): ', this.horariosArr.join(''));
    // console.log('horarios: ', this.horariosArr);
  }

  getSelectedEspecialidad(item) {
    console.log('Selected id: ', item.target.value);
    console.log('Selected especialidad: ', item.target.selectedOptions[0].text);
  }

  getSelectedHorario(item) {
    this.selectedTurno = item; // Almacenar en variable para usar en linea 185
    if (this.diasFiltrados) { this.setHorariosEsp(); }
  }

  getdias(event){
    console.log(event);
  }

  comboChange(event) {
    this.isDiasClosed = false;
    if (!event) {
      // console.log('previo', this.selectedDias)
      // console.log('actual', this.formGroup.value.medEspecialidad.dia);
      this.isDiasClosed = true;
      if (JSON.stringify(this.selectedDias) !== JSON.stringify(this.formGroup.value.medEspecialidad.dia)) {
        this.selectedDias = this.formGroup.value.medEspecialidad.dia;
        if (this.selectedDias) {
          this.filterObsDias(this.selectedDias);
          // this.formGroup.value.medEspecialidad.mañana = 'seleccionar horario';
          // this.formGroup.value.medEspecialidad.tarde = 'seleccionar horario';
        }
      }
    }
  }
}
