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
  medEspecialidad: MedicoEspecialidad;
  data: any;
  horarios: any;

  selectedDias: Array<any>;
  isDiasClosed: boolean;
  diasFiltrados: any;
  selectedTurno: any;

  // this.horariosArr[dias.mañana] = turnoMselec
  // this.turnoMselec = obs.id_horario

  // prueba = ['uno', 'dos', 'tres'];
  horariosArr = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];

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
    // this.postMedEspecialidad(this.formGroup.value.medEspecialidad);
    this.formGroup.patchValue({
      medEspecialidad: ({
        mañana : 21
      })
    });
    console.log(this.formGroup);
  }
  onSubmitId() {
    this.putMedEspecialidad(this.formGroup.value.medEspecialidad);
  }

  getEspecialidades() {
    this.especialidadServ.getEspecialidades().subscribe(
      res => {
        this.especialidades = res;
        console.log('especialidades', this.especialidades);
      },
      err => console.error(err)
    );
  }

  getHorarios() {
    this.medEspServ.getHorarios().subscribe(
      res => {
        this.horarios = res;
        console.log('horarios', this.horarios);
      },
      err => console.error(err)
    );
  }

  postMedEspecialidad(body) {
    this.medEspServ.saveMedEspecialidad(this.medEspecialidad).subscribe(
        res => {
          this.add = true;
          setTimeout(() => {
          this.add = false;
          // this.router.navigate(['panel/']);
        }, 1500);
        },
        err => this.errors = err
      );
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
      err => console.log(err)
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
    console.log('outside', this.diasFiltrados);
    if (this.selectedTurno) { this.setHorariosEsp(); }
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
    console.log('horarios', this.horariosArr.join(''));
  }

  getSelectedEspecialidad(item) {
    console.log(item.target.value);
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
      console.log('previo', this.selectedDias, 'actual', this.formGroup.value.medEspecialidad.dia);
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
