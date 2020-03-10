import { Component, OnInit } from '@angular/core';
import { MedicosService } from '../../../services/medicos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.css']
})
export class MedicosComponent implements OnInit {

  medicos;

  constructor(private medicsServ: MedicosService, private router: Router) { }

  ngOnInit() {
    this.getMedicos();
  }

  addMedico() {
    this.router.navigate(['/panel/medico']);
  }

  getMedicos() {
    this.medicsServ.getMedicos().subscribe(
      res => {
        this.medicos = res;
        console.log(this.medicos);
      },
      err => console.log(err)
    );
  }
}
