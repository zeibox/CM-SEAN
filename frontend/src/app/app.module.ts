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
    AreaComponent
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
