import { Component, OnInit} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from '../../../interfaces/areas';
import { AreasService } from '../../../services/areas.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css'],
})
export class AreaComponent implements OnInit {

  area: Area = {
    id_area: 0,
    nombre: '',
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
    private servArea: AreasService,
    private router: Router,
    private datosRec: ActivatedRoute) {}

  ngOnInit() {
    this.idRute = this.datosRec.snapshot.params.id;
    if (this.idRute) {
      this.getArea(this.idRute);
    }
    this.formGroupFormat(); // formateo del formGroup obligatorio
  }

  onSubmit() {
    this.postArea(this.formGroup.value.area);
  }
  onSubmitId() {
    this.putArea(this.formGroup.value.area);
  }

  postArea(body) {
    this.area.nombre = body.nombre;
    // console.log(this.area);
    this.servArea.saveArea(this.area).subscribe(
        res => {
          this.add = true;
          setTimeout(() => {
          this.add = false;
          this.router.navigate(['panel/areas']);
        }, 1500);
        },
        err => this.errors = err
      );
  }

  putArea(body: Area) {
    body.creado_en = new Date(); // Asigna newDate() a la fecha antes de mandar el objeto como parametro al back
    this.servArea.updateArea(this.idRute, body).subscribe(
      res => {
        this.edit = true;
        setTimeout(() => {
          this.edit = false;
          this.router.navigate(['panel/areas']);
        }, 1500);
      },
      err => console.log(err)
    );
  }

  deleteArea() {
    // console.log(id);
    this.servArea.deleteArea(this.idRute).subscribe(
      res => {
        this.delete = true;
        setTimeout(() => {
          this.delete = false;
          this.router.navigate(['panel/areas']);
        }, 1500);
      },
      err => console.log(err)
    );
  }

  getArea(id) {
    this.servArea.getArea(id).subscribe(
      res => {
        this.area = res;

        this.formGroup = this.formBuilder.group({
          area: this.formBuilder.group({
            id_area: this.area.id_area,
            creado_en: [{value: this.datePipe.transform(this.area.creado_en, 'dd MMMM yy, HH:mm', '+1800'), disabled: true}],
            id_user: this.area.id_user,
            nombre: this.area.nombre,
          }),
        }, { updateOn: 'change' });
        // console.log(this.formGroup.value);
      },
      err => console.error(err)
    );
  }

  formGroupFormat() {
    this.formGroup = this.formBuilder.group({
      area: this.formBuilder.group({
        creado_en: [{value: '', disabled: true}],
        nombre: ['', Validators.required]
      }),
    }, { updateOn: 'change' });
  }
}
