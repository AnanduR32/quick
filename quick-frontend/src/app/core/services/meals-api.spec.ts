import { TestBed } from '@angular/core/testing';

import { MealsApi } from './meals-api';

describe('MealsApi', () => {
  let service: MealsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MealsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
