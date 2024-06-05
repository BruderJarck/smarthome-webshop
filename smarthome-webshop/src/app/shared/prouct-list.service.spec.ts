import { TestBed } from '@angular/core/testing';

import { ProuctListService } from './prouct-list.service';

describe('ProuctListService', () => {
  let service: ProuctListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProuctListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
