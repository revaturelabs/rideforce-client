
import { AppModule } from '../app.module';
import { TestBed, async } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {APP_BASE_HREF} from '@angular/common';

describe('AuthService', () => {
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
    auth = TestBed.get(AuthService);
  });
  
  it ('should be created', function() {
    expect(auth).toBeTruthy();
    expect(auth.principal).not.toBeNull();
  });

   it('#authenticator should return "User does not exist."', function() {
    spyOn(auth,'authenticator').and.callThrough();
    auth.authenticator('Garbage', 'Garbage').then(
      () => {
        expect().nothing();
      },
      e => {
        expect(e.message).toEqual('User does not exist.');
      }
    );
  });

  it('#authenticator should return "Missing required parameter USERNAME" ', function(){
    spyOn(auth,'authenticator').and.callThrough();
    auth.authenticator("","").then(
      () => {
        expect().nothing();
      },
      e => {
        expect(e.message).toEqual('Missing required parameter USERNAME');
      }
    );
  });

  it('#authenticate should be called ', function(){
    spyOn(auth,'authenticate').and.callThrough();
    auth.authenticate("","");
    expect(auth.authenticate).toBeTruthy();
  });

  it('#checkAuthenticate should be called ', function(){
    spyOn(auth,'checkAuthenticate').and.callThrough();
    auth.checkAuthenticate();
    expect(auth.checkAuthenticate).toBeTruthy();
  });

  it('#isTrainer should return a boolean value', function(){
    spyOn(auth,'isTrainer').and.callThrough();
    
    let returnValue = auth.isTrainer();
    expect(returnValue).toBe(false);
  });

  it('#isAdmin should return a boolean value', function(){
    spyOn(auth,'isAdmin').and.callThrough();

    let returnValue = auth.isAdmin();
    expect(returnValue).toBe(false);
  });

  it('#getAuthToken should return a string authToken', function(){
    spyOn(auth,'getAuthToken').and.callThrough();
    let returnValue = auth.getAuthToken();
    expect(returnValue).not.toBeNull();
  });

  it('#getUserByEmail should return a user', function() {
    spyOn(auth,'getUserByEmail').and.callThrough();
    let returnValue = auth.getUserByEmail('jedimasterdjd@yahoo.com');
    expect(returnValue).not.toBeNull();
  });

});
