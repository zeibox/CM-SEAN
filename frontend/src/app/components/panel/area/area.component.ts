import { Component, OnInit, HostBinding } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Area } from '../../../interfaces/areas';
import { AreasService } from '../../../services/areas.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  area: Area = {
    id_area: 0,
    nombre: '',
    id_user: 1,
    creado_en: new Date()
  };

  idN: any;
  edit: boolean;
  delete: boolean;
  add: boolean;
  errors: string;
  formGroup: FormGroup;
  datePipe = new DatePipe('en-US');

  constructor(
    private formBuilder: FormBuilder,
    private servArea: AreasService,
    private router: Router,
    private datosRec: ActivatedRoute) {}

  ngOnInit() {

    this.idN = this.datosRec.snapshot.params.id;

    if (!this.idN) {

      this.formGroup = this.formBuilder.group({
        area: this.formBuilder.group({
          fecha: [{value: '', disabled: true}],
          areaNombre: ['', Validators.required]
        }),
      }, { updateOn: 'blur' });

    } else {

      this.getArea(this.idN);

      this.formGroup = this.formBuilder.group({
        area: this.formBuilder.group({
          fecha: [{value: '', disabled: true}],
          areaNombre: ['', Validators.required]
        }),
      }, { updateOn: 'blur' });

    }
  }

  onSubmit() {
    // agregar metodo que le pega a la api POST
    this.setArea(this.formGroup.value.area);
    console.log(this.formGroup.value.area);
  }
  onSubmitId() {
    // agregar metodo que le pega a la api PUT
    this.putArea(this.formGroup.value.area);
    console.log("xxx");
  }

  setArea(body) {
    console.log(body);

    this.servArea.saveArea(body)
      .subscribe(
        res => {
          this.router.navigate(['/panel/areas']);
        },
        err => this.errors = err
      );
  }

  putArea(body) {
    delete this.area.creado_en;  // Para no cambiar la fecha - No enviamos este parámetro
    this.servArea.updateArea(this.idN, body)
    .subscribe(
      res => {
        this.errors = null;
        this.edit = true;
        setTimeout(() => {
          this.edit = false;
          this.router.navigate(['panel/areas']);
        }, 2000);
      },
      err => console.log(err)
    );
  }

  deleteArea() {
    // console.log(id);
    this.servArea.deleteArea(this.idN).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/panel/areas']);
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
            fecha: [{value: this.datePipe.transform(this.area.creado_en), disabled: true}],
            areaNombre: this.area.nombre
          }),
        }, { updateOn: 'blur' });

      },
      err => console.error(err)
    );
  }
}
