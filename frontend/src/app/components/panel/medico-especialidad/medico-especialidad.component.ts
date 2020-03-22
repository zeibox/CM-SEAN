import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Time } from '@angular/common';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { MedicoEspecialidad } from '../../../interfaces/medicos';
import { MedicosEspecialidadesService } from '../../../services/medicos-especialidades.service';
import {MatSelectModule} from '@angular/material/select';


@Component({
  selector: 'app-medico-especialidad',
  templateUrl: './medico-especialidad.component.html',
  styleUrls: ['./medico-especialidad.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MedicoEspecialidadComponent implements OnInit {

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

  getSelected(item){
    console.log(item);
    console.log(this.formGroup.value.medEspecialidad);
  }

  getdias(event){
    console.log(event);
  }
}
