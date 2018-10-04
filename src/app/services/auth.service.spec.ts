import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));
  
  it('should be created', async(inject([HttpClientTestingModule, AuthService],
    (httpClient: HttpClientTestingModule, authService: AuthService) => {
      expect(authService).toBeTruthy();
  })));

  it('should return Incorrect email or password.', function(){
    const service: AuthService=TestBed.get(AuthService);
    service.authenticate("Garbage","Garbage").subscribe(
      () => {
        
      },
      e => {
        expect(e.message).toEqual('Incorrect email or password.');
      }
    )
  });

  it('should return Input validation failed. ', function(){
    const service: AuthService=TestBed.get(AuthService);
    service.authenticate("","").subscribe(
      () => {
        
      },
      e => {
        expect(e.message).toEqual('Input validation failed.');
      }
    )
  });
});
