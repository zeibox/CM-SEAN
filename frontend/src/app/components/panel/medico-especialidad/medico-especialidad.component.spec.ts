import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoEspecialidadComponent } from './medico-especialidad.component';

describe('MedicoEspecialidadComponent', () => {
  let component: MedicoEspecialidadComponent;
  let fixture: ComponentFixture<MedicoEspecialidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoEspecialidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoEspecialidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
