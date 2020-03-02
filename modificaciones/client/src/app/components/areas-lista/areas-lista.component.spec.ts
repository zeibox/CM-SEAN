import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasListaComponent } from './areas-lista.component';

describe('AreasListaComponent', () => {
  let component: AreasListaComponent;
  let fixture: ComponentFixture<AreasListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
