import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultoriosComponent } from './components/panel/consultorios/consultorios.component';
import { ConsultorioComponent } from './components/panel/consultorio/consultorio.component';
import { HomeComponent } from './components/panel/home/home.component';
import { MedicoComponent } from './components/panel/medico/medico.component';
import { MedicosComponent } from './components/panel/medicos/medicos.component';
import { AreasComponent } from './components/panel/areas/areas.component';
import { AreaComponent } from './components/panel/area/area.component';
import { JerarquiaComponent } from './components/panel/jerarquia/jerarquia.component';
import { JerarquiasComponent } from './components/panel/jerarquias/jerarquias.component';
import { ObrasSocialesComponent } from './components/panel/obras-sociales/obras-sociales.component';
import { ObraSocialComponent } from './components/panel/obra-social/obra-social.component';

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
  { path: 'panel/area', component: AreaComponent },
  { path: 'panel/jerarquias', component: JerarquiasComponent },
  { path: 'panel/jerarquias/:id', component: JerarquiaComponent },
  { path: 'panel/jerarquia', component: JerarquiaComponent },
  { path: 'panel/obrasSociales', component: ObrasSocialesComponent },
  { path: 'panel/obrasSociales/:id', component: ObraSocialComponent },
  { path: 'panel/obraSocial', component: ObraSocialComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
