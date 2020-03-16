import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JerarquiasComponent } from './jerarquias.component';

describe('JerarquiasComponent', () => {
  let component: JerarquiasComponent;
  let fixture: ComponentFixture<JerarquiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JerarquiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JerarquiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
