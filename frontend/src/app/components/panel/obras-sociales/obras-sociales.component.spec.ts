import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObrasSocialesComponent } from './obras-sociales.component';

describe('ObrasSocialesComponent', () => {
  let component: ObrasSocialesComponent;
  let fixture: ComponentFixture<ObrasSocialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObrasSocialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObrasSocialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
