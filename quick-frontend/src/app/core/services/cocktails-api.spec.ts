import { TestBed } from '@angular/core/testing';

import { CocktailsApi } from './cocktails-api';

describe('CocktailsApi', () => {
  let service: CocktailsApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CocktailsApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
