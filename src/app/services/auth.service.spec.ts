
import { AppModule } from '../app.module';
import { TestBed, async, ComponentFixture, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthService } from './auth.service';

import {APP_BASE_HREF} from '@angular/common';

describe('AuthService', () => {
  // beforeEach(() => TestBed.configureTestingModule({
  //   imports: [HttpClientTestingModule]
  // }));
  // let fixture: ComponentFixture<AuthService>;
  let auth: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        // declarations: [ LoginComponent ],
        imports: [
          AppModule
          ],
        providers: [ {provide: APP_BASE_HREF, useValue : '/' }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(AuthService);
    // auth = fixture.componentInstance;
    auth = TestBed.get(AuthService);
    // fixture.detectChanges();
  });

  // it('should be created', async(inject([HttpClientTestingModule, AuthService],
  //   (httpClient: HttpClientTestingModule, authService: AuthService) => {
  //     expect(authService).toBeTruthy();
  // })));
  it ('should be created', function() {
    expect(auth).toBeTruthy();
  });

  it('should return Incorrect email or password.', function() {
    // const service: AuthService = TestBed.get(AuthService);
    auth.authenticator('Garbage', 'Garbage').then(
      () => {
        expect().nothing();
      },
      e => {
        expect(e.message).toEqual('Incorrect email or password.');
      }
    );
  });

  it('should return Input validation failed. ', function() {
    // const service: AuthService = TestBed.get(AuthService);
    auth.authenticator('', '').then(
      () => {
        expect().nothing();
      },
      e => {
        expect(e.message).toEqual('Input validation failed.');
      }
    );
  });
});
