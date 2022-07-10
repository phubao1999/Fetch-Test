import { TestBed } from '@angular/core/testing';

import { BrandCarHttpService } from './brand-car-http.service';

describe('BrandCarHttpService', () => {
  let service: BrandCarHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrandCarHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
