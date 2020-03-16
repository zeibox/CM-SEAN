import { Component, OnInit} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pais } from '../../../interfaces/paises';
import { PaisesService } from '../../../services/paises.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-pais',
  templateUrl: './pais.component.html',
  styleUrls: ['./pais.component.css']
})
export class PaisComponent implements OnInit {

  pais: Pais = {
    id_pais: 0,
    nombre: '',
    //id_user: 1,
    //creado_en: new Date()
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
    private servPais: PaisesService,
    private router: Router,
    private datosRec: ActivatedRoute) {}

  ngOnInit() {
    this.idRute = this.datosRec.snapshot.params.id;
    if (this.idRute) {
      this.getPais(this.idRute);
    }
    this.formGroupFormat(); // formateo del formGroup obligatorio
  }

  onSubmit() {
    this.postPais(this.formGroup.value.pais);
  }
  onSubmitId() {
    this.putPais(this.formGroup.value.pais);
  }

  postPais(body) {
    this.pais.nombre = body.nombre;
    this.servPais.savePais(this.pais).subscribe(
        res => {
          this.add = true;
          setTimeout(() => {
          this.add = false;
          this.router.navigate(['panel/paises']);
        }, 1500);
        },
        err => this.errors = err
      );
  }

  putPais(body: Pais) {
    //body.creado_en = new Date(); // Asigna newDate() a la fecha antes de mandar el objeto como parametro al back
    this.servPais.updatePais(this.idRute, body).subscribe(
      res => {
        this.edit = true;
        setTimeout(() => {
          this.edit = false;
          this.router.navigate(['panel/paises']);
        }, 1500);
      },
      err => console.log(err)
    );
  }

  deletePais() {
    // console.log(id);
    this.servPais.deletePais(this.idRute).subscribe(
      res => {
        this.delete = true;
        setTimeout(() => {
          this.delete = false;
          this.router.navigate(['panel/paises']);
        }, 1500);
      },
      err => console.log(err)
    );
  }

  getPais(id) {
    this.servPais.getPais(id).subscribe(
      res => {
        this.pais = res;

        this.formGroup = this.formBuilder.group({
          pais: this.formBuilder.group({
            id_pais: this.pais.id_pais,
            //creado_en: [{value: this.datePipe.transform(this.pais.creado_en, 'dd MMMM yy, HH:mm', '+1800'), disabled: true}],
            //id_user: this.pais.id_user,
            nombre: this.pais.nombre,
          }),
        }, { updateOn: 'change' });
        // console.log(this.formGroup.value);
      },
      err => console.error(err)
    );
  }

  formGroupFormat() {
    this.formGroup = this.formBuilder.group({
      pais: this.formBuilder.group({
        //creado_en: [{value: '', disabled: true}],
        nombre: ['', Validators.required]
      }),
    }, { updateOn: 'change' });
  }
}
