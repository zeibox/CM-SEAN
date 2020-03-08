import { Component, OnInit} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ObraSocial } from '../../../interfaces/obras-sociales';
import { ObrasSocialesService } from '../../../services/obras-sociales.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-obra-social',
  templateUrl: './obra-social.component.html',
  styleUrls: ['./obra-social.component.css']
})
export class ObraSocialComponent implements OnInit {


  obraSocial: ObraSocial = {
    id_obra_social: 0,
    nombre: '',
    imagen: '',
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
    private obrasSocialesServ: ObrasSocialesService,
    private router: Router,
    private datosRec: ActivatedRoute) { }

    ngOnInit() {
      this.idRute = this.datosRec.snapshot.params.id;
      if (this.idRute) {
        this.getObraSocial(this.idRute);
      }
      this.formGroupFormat(); // formateo del formGroup obligatorio
    }

    onSubmit() {
      this.postObraSocial(this.formGroup.value.obraSocial);
    }
    onSubmitId() {
      this.putObraSocial(this.formGroup.value.obraSocial);
    }

    postObraSocial(body) {
      this.obraSocial.nombre = body.nombre;
      this.obraSocial.imagen = body.imagen;
      this.obrasSocialesServ.saveObraSocial(this.obraSocial).subscribe(
          res => {
            this.add = true;
            setTimeout(() => {
            this.add = false;
            this.router.navigate(['panel/obrassociales']);
          }, 1500);
          },
          err => this.errors = err
        );
    }

    putObraSocial(body: ObraSocial) {
      body.creado_en = new Date(); // Asigna newDate() a la fecha antes de mandar el objeto como parametro al back
      this.obrasSocialesServ.updateObraSocial(this.idRute, body).subscribe(
        res => {
          this.edit = true;
          setTimeout(() => {
            this.edit = false;
            this.router.navigate(['panel/obrassociales']);
          }, 1500);
        },
        err => console.log(err)
      );
    }

    deleteObraSocial() {
      // console.log(id);
      this.obrasSocialesServ.deleteObraSocial(this.idRute).subscribe(
        res => {
          this.delete = true;
          setTimeout(() => {
            this.delete = false;
            this.router.navigate(['panel/obrassociales']);
          }, 1500);
        },
        err => console.log(err)
      );
    }

    getObraSocial(id) {
      this.obrasSocialesServ.getObraSocial(id).subscribe(
        res => {
          this.obraSocial = res;

          this.formGroup = this.formBuilder.group({
            obraSocial: this.formBuilder.group({
              id_obra_social: this.obraSocial.id_obra_social,
              creado_en: [{value: this.datePipe.transform(this.obraSocial.creado_en, 'dd MMMM yy, HH:mm', '+1800'), disabled: true}],
              id_user: this.obraSocial.id_user,
              nombre: this.obraSocial.nombre,
              imagen: this.obraSocial.imagen,
            }),
          }, { updateOn: 'change' });
          // console.log(this.formGroup.value);
        },
        err => console.error(err)
      );
    }

    formGroupFormat() {
      this.formGroup = this.formBuilder.group({
        obraSocial: this.formBuilder.group({
          creado_en: [{value: '', disabled: true}],
          nombre: ['', Validators.required],
          imagen: ['', Validators.required]
        }),
      }, { updateOn: 'change' });
    }

}
