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
import { EspecialidadesComponent } from './components/panel/especialidades/especialidades.component';
import { EspecialidadComponent } from './components/panel/especialidad/especialidad.component';
import { PaisesComponent } from './components/panel/paises/paises.component';
import { PaisComponent } from './components/panel/pais/pais.component';
import { ObrasSocialesComponent } from './components/panel/obras-sociales/obras-sociales.component';
import { ObraSocialComponent } from './components/panel/obra-social/obra-social.component';
import { GenerosComponent } from './components/panel/generos/generos.component';
import { GeneroComponent } from './components/panel/genero/genero.component';
import { PacientesComponent } from './components/panel/pacientes/pacientes.component';
import { PacienteComponent } from './components/panel/paciente/paciente.component';
import { UsuariosComponent } from './components/panel/usuarios/usuarios.component';
import { UsuarioComponent } from './components/panel/usuario/usuario.component';
import { TurnosComponent } from './components/panel/turnos/turnos.component';
import { TurnoComponent } from './components/panel/turno/turno.component';

const routes: Routes = [
  { path: '', redirectTo: 'panel', pathMatch: 'full'},
  { path: 'panel', component: HomeComponent },
  { path: 'panel/consultorios', component: ConsultoriosComponent },
  { path: 'panel/consultorio', component: ConsultorioComponent },
  { path: 'panel/consultorio/:id', component: ConsultorioComponent },
  { path: 'panel/medicos', component: MedicosComponent },
  { path: 'panel/medico', component: MedicoComponent },
  { path: 'panel/medico/:id', component: MedicoComponent },
  { path: 'panel/areas', component: AreasComponent },
  { path: 'panel/areas/:id', component: AreaComponent },
  { path: 'panel/area', component: AreaComponent },
  { path: 'panel/jerarquias', component: JerarquiasComponent },
  { path: 'panel/jerarquias/:id', component: JerarquiaComponent },
  { path: 'panel/jerarquia', component: JerarquiaComponent },
  { path: 'panel/especialidades', component: EspecialidadesComponent },
  { path: 'panel/especialidades/:id', component: EspecialidadComponent },
  { path: 'panel/especialidad', component: EspecialidadComponent },
  { path: 'panel/paises', component: PaisesComponent },
  { path: 'panel/especialidades/:id', component: EspecialidadComponent },
  { path: 'panel/paises/:id', component: PaisComponent },
  { path: 'panel/pais', component: PaisComponent },
  { path: 'panel/obrassociales', component: ObrasSocialesComponent },
  { path: 'panel/obrassociales/:id', component: ObraSocialComponent },
  { path: 'panel/obraSocial', component: ObraSocialComponent },
  { path: 'panel/generos', component: GenerosComponent },
  { path: 'panel/generos/:id', component: GeneroComponent },
  { path: 'panel/pacientes', component: PacientesComponent },
  { path: 'panel/paciente', component: PacienteComponent },
  { path: 'panel/paciente:id', component: PacienteComponent },
  { path: 'panel/usuarios', component: UsuariosComponent },
  { path: 'panel/usuario', component: UsuarioComponent },
  { path: 'panel/usuario:id', component: UsuarioComponent },
  { path: 'panel/turnos', component: TurnosComponent },
  { path: 'panel/turno', component: TurnoComponent },
  { path: 'panel/turno:id', component: TurnoComponent }

];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
