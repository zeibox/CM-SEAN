import { TestBed } from '@angular/core/testing';

import { JerarquiasService } from './jerarquias.service';

describe('JerarquiasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JerarquiasService = TestBed.get(JerarquiasService);
    expect(service).toBeTruthy();
  });
});
