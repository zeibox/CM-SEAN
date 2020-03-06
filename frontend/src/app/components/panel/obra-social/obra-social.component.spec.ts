import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ObraSocialComponent } from './obra-social.component';

describe('ObraSocialComponent', () => {
  let component: ObraSocialComponent;
  let fixture: ComponentFixture<ObraSocialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ObraSocialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ObraSocialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
