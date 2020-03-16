import { Component, OnInit} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Jerarquia } from '../../../interfaces/jerarquias';
import { JerarquiasService } from '../../../services/jerarquias.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-jerarquia',
  templateUrl: './jerarquia.component.html',
  styleUrls: ['./jerarquia.component.css']
})
export class JerarquiaComponent implements OnInit {

  jerarquia: Jerarquia = {
    id_jerarquia: 0,
    nombre: '',
    porcentual: 0,
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
    private jerarquiaServ: JerarquiasService,
    private router: Router,
    private datosRec: ActivatedRoute
  ) { }

  ngOnInit() {
    this.idRute = this.datosRec.snapshot.params.id;

    if (this.idRute) {
      this.getJerarquia(this.idRute);
    }

    this.formGroupFormat(); // formateo del formGroup obligatorio
  }

  onSubmit() {
    this.postJerarquia(this.formGroup.value.jerarquia);
  }
  onSubmitId() {
    this.putJerarquia(this.formGroup.value.jerarquia);
  }

  postJerarquia(body) {
    this.jerarquia.nombre = body.nombre;
    this.jerarquia.porcentual = body.porcentual;
    this.jerarquiaServ.saveJerarquia(this.jerarquia).subscribe(
        res => {
          this.add = true;
          setTimeout(() => {
          this.add = false;
          this.router.navigate(['panel/jerarquias']);
        }, 1500);
        },
        err => this.errors = err
      );
  }

  putJerarquia(body: Jerarquia) {
    body.creado_en = new Date(); // Asigna newDate() a la fecha antes de mandar el objeto como parametro al back
    this.jerarquiaServ.updateJerarquia(this.idRute, body).subscribe(
      res => {
        this.edit = true;
        setTimeout(() => {
          this.edit = false;
          this.router.navigate(['panel/jerarquias']);
        }, 1500);
      },
      err => console.log(err)
    );
  }

  deleteJerarquia() {
    // console.log(id);
    this.jerarquiaServ.deleteJerarquia(this.idRute).subscribe(
      res => {
        this.delete = true;
        setTimeout(() => {
          this.delete = false;
          this.router.navigate(['panel/jerarquias']);
        }, 1500);
      },
      err => console.log(err)
    );
  }

  getJerarquia(id) {
    this.jerarquiaServ.getJerarquia(id).subscribe(
      res => {
        this.jerarquia = res;

        this.formGroup = this.formBuilder.group({
          jerarquia: this.formBuilder.group({
            id_jerarquia: this.jerarquia.id_jerarquia,
            creado_en: [{value: this.datePipe.transform(this.jerarquia.creado_en, 'dd MMMM yyyy, HH:mm', '+1800'), disabled: true}],
            id_user: this.jerarquia.id_user,
            nombre: this.jerarquia.nombre,
            porcentual: this.jerarquia.porcentual,
          }),
        }, { updateOn: 'change' });
        // console.log(this.formGroup.value);
      },
      err => console.error(err)
    );
  }

  formGroupFormat() {
    this.formGroup = this.formBuilder.group({
      jerarquia: this.formBuilder.group({
        creado_en: [{value: '', disabled: true}],
        nombre: ['', Validators.required],
        porcentual: [0 , Validators.required]
      }),
    }, { updateOn: 'change' });
  }

}
