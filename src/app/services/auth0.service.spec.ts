import { TestBed } from '@angular/core/testing';

import { Auth0Service } from './auth0.service';

xdescribe('Auth0Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Auth0Service = TestBed.get(Auth0Service);
    expect(service).toBeTruthy();
  });
});
