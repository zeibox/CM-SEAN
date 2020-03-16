import { Component, OnInit } from '@angular/core';
import { ProvinciasService } from 'src/app/services/provincias.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-provincias',
  templateUrl: './provincias.component.html',
  styleUrls: ['./provincias.component.css']
})
export class ProvinciasComponent implements OnInit {

  data;
  value;

  constructor(
    private provinciasServ: ProvinciasService,
    private router: Router) { }

  ngOnInit() {
    this.getProvincias();
  }

  addProvincia() {
    this.router.navigate(['/panel/provincia']);
  }

  getProvincias() {
    this.provinciasServ.getProvincias().subscribe(
      res => {
        this.data = res;
      },
      err => console.log(err)
    );
  }

  searchProvincias(cadena: string) {
    if (cadena === '') {
      this.getProvincias();
    } else {}
  }
}
