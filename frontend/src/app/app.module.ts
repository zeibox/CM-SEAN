import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { PanelComponent } from './components/panel/panel.component';
import { ConsultoriosComponent } from './components/panel/consultorios/consultorios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConsultorioComponent } from './components/panel/consultorio/consultorio.component';
import { FilterPipe } from './pipes/filter.pipe';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/panel/home/home.component';
import { MedicoComponent } from './components/panel/medico/medico.component';
import { MedicosComponent } from './components/panel/medicos/medicos.component';
import { AreasComponent } from './components/panel/areas/areas.component';
import { AreaComponent } from './components/panel/area/area.component';

import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { JerarquiasComponent } from './components/panel/jerarquias/jerarquias.component';
import { JerarquiaComponent } from './components/panel/jerarquia/jerarquia.component';
import { EspecialidadesComponent } from './components/panel/especialidades/especialidades.component';
import { EspecialidadComponent } from './components/panel/especialidad/especialidad.component';
import { PaisesComponent } from './components/panel/paises/paises.component';
import { PaisComponent } from './components/panel/pais/pais.component';
import { ObrasSocialesComponent } from './components/panel/obras-sociales/obras-sociales.component';
import { ObraSocialComponent } from './components/panel/obra-social/obra-social.component';
import { GenerosComponent } from './components/panel/generos/generos.component';
import { GeneroComponent } from './components/panel/genero/genero.component';
import { SpacesPipe } from './pipes/spaces.pipe';
import { PacientesComponent } from './components/panel/pacientes/pacientes.component';
import { PacienteComponent } from './components/panel/paciente/paciente.component';
import { TurnoComponent } from './components/panel/turno/turno.component';
import { TurnosComponent } from './components/panel/turnos/turnos.component';
import { UsuariosComponent } from './components/panel/usuarios/usuarios.component';
import { UsuarioComponent } from './components/panel/usuario/usuario.component';


registerLocaleData(localeEsAr, 'es-Ar');


@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    ConsultoriosComponent,
    ConsultorioComponent,
    FilterPipe,
    HomeComponent,
    MedicoComponent,
    MedicosComponent,
    AreasComponent,
    AreaComponent,
    JerarquiasComponent,
    JerarquiaComponent,
    EspecialidadesComponent,
    EspecialidadComponent,
    PaisesComponent,
    PaisComponent,
    ObrasSocialesComponent,
    ObraSocialComponent,
    GenerosComponent,
    GeneroComponent,
    SpacesPipe,
    PacienteComponent,
    PacientesComponent,
    TurnoComponent,
    TurnosComponent,
    UsuariosComponent,
    UsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ { provide: LOCALE_ID, useValue: 'es-Ar' } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
