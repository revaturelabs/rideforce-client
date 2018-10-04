import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { HttpClientTestingModule } from '../../../node_modules/@angular/common/http/testing';

describe('AuthService', () => {
 beforeEach(() => TestBed.configureTestingModule({
   imports: [HttpClientTestingModule]
 }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
