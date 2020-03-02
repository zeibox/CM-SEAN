import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultoriosComponent } from './components/panel/consultorios/consultorios.component';
import { ConsultorioComponent } from './components/panel/consultorio/consultorio.component';
import { HomeComponent } from './components/panel/home/home.component';
import { MedicoComponent } from './components/panel/medico/medico.component';
import { MedicosComponent } from './components/panel/medicos/medicos.component';
import { AreasComponent } from './components/panel/areas/areas.component';
import { AreaComponent } from './components/panel/area/area.component';

const routes: Routes = [
  { path: '', redirectTo: 'panel', pathMatch: 'full'},
  { path: 'panel', component: HomeComponent },
  { path: 'panel/consultorios', component: ConsultoriosComponent },
  { path: 'panel/consultorio', component: ConsultorioComponent },
  { path: 'panel/consultorio/:id', component: ConsultorioComponent },
  { path: 'panel/medics', component: MedicosComponent },
  { path: 'panel/medic', component: MedicoComponent },
  { path: 'panel/medic/:id', component: MedicoComponent },
  { path: 'panel/areas', component: AreasComponent },
  { path: 'panel/areas/:id', component: AreaComponent },
  { path: 'panel/area', component: AreaComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
