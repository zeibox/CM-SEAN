import { Component, OnInit} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Especialidad } from '../../../interfaces/especialidades';
import { EspecialidadesService } from '../../../services/especialidades.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-especialidad',
  templateUrl: './especialidad.component.html',
  styleUrls: ['./especialidad.component.css']
})
export class EspecialidadComponent implements OnInit {

  especialidad: Especialidad = {
    id_especialidad: 0,
    nombre: '',
    duracion_turno: new Date(),
    id_user: 1,
    creado_en: new Date()
  };

  idRute: any;
  edit: boolean;
  delete: boolean;
  add: boolean;
  errors: string;
  formGroup: FormGroup;
  // Locale importado manualmente, revisar app module (localeEsAr, LOCALE_ID, registerLocaleData y providers)
  datePipe = new DatePipe('es-AR');
  titleVar: string;

  constructor(
    private formBuilder: FormBuilder,
    private servEspecialidad: EspecialidadesService,
    private router: Router,
    private datosRec: ActivatedRoute) {}

  ngOnInit() {
    this.idRute = this.datosRec.snapshot.params.id;

    if (!this.idRute) {
      this.formGroupFormat(); // formateo del formGroup obligatorio
    } else {
      this.getEspecialidad(this.idRute);
      this.formGroupFormat(); // formateo del formGroup obligatorio
    }
  }

  onSubmit() {
    this.postEspecialidad(this.formGroup.value.especialidad);
  }
  onSubmitId() {
    this.putEspecialidad(this.formGroup.value.especialidad);
  }

  postEspecialidad(body: Especialidad) {
    this.especialidad.nombre = body.nombre;
    this.especialidad.duracion_turno = body.duracion_turno;
    this.servEspecialidad.saveEspecialidad(this.especialidad).subscribe(
        res => {
          this.add = true;
          setTimeout(() => {
          this.add = false;
          this.router.navigate(['panel/especialidades']);
        }, 1500);
        },
        err => this.errors = err
      );
  }

  putEspecialidad(body: Especialidad) {
    body.creado_en = new Date(); // Asigna newDate() a la fecha antes de mandar el objeto como parametro al back
    this.servEspecialidad.updateEspecialidad(this.idRute, body).subscribe(
      res => {
        this.edit = true;
        setTimeout(() => {
          this.edit = false;
          this.router.navigate(['panel/especialidades']);
        }, 1500);
      },
      err => console.log(err)
    );
  }

  deleteEspecialidad() {
    // console.log(id);
    this.servEspecialidad.deleteEspecialidad(this.idRute).subscribe(
      res => {
        this.delete = true;
        setTimeout(() => {
          this.delete = false;
          this.router.navigate(['panel/especialidades']);
        }, 1500);
      },
      err => console.log(err)
    );
  }

  getEspecialidad(id) {
    this.servEspecialidad.getEspecialidad(id).subscribe(
      res => {
        this.especialidad = res;

        this.formGroup = this.formBuilder.group({
          especialidad: this.formBuilder.group({
            id_especialidad: this.especialidad.id_especialidad,
            creado_en: [{value: this.datePipe.transform(this.especialidad.creado_en, 'dd MMMM yyyy, HH:mm', '+1800'), disabled: true}],
            id_user: this.especialidad.id_user,
            duracion_turno: this.especialidad.duracion_turno,
            nombre: this.especialidad.nombre,
          }),
        }, { updateOn: 'change' });
        // console.log(this.formGroup.value);
      },
      err => console.error(err)
    );
  }

  formGroupFormat() {
    this.formGroup = this.formBuilder.group({
      especialidad: this.formBuilder.group({
        creado_en: [{value: '', disabled: true}],
        nombre: ['', Validators.required],
        duracion_turno: ['', Validators.required]
      }),
    }, { updateOn: 'change' });
  }
}

