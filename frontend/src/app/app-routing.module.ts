import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PanelComponent } from './components/panel/panel.component';
import { ConsultoriosComponent } from './components/panel/consultorios/consultorios.component';
import { ConsultorioComponent } from './components/panel/consultorio/consultorio.component';
import { HomeComponent } from './components/panel/home/home.component';
import { MedicComponent } from './components/panel/medic/medic.component';
import { MedicsComponent } from './components/panel/medics/medics.component';

const routes: Routes = [
  { path: '', redirectTo: 'panel', pathMatch: 'full'},
  { path: 'panel', component: HomeComponent },
  { path: 'panel/consultorios', component: ConsultoriosComponent },
  { path: 'panel/consultorio', component: ConsultorioComponent },
  { path: 'panel/consultorio/:id', component: ConsultorioComponent },
  { path: 'panel/medics', component: MedicsComponent },
  { path: 'panel/medic', component: MedicComponent },
  { path: 'panel/medic/:id', component: MedicComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
