import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { By } from '@angular/platform-browser';

import { LoginComponent } from '../login/login.component';

import {APP_BASE_HREF} from '@angular/common';

// *********************************************************//
// Tests currently work 90% of the time                     //
//                                                        //
// ********************************************************/

xdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        //declarations: [ LoginComponent ],
        imports: [
          AppModule
          ],
        providers: [
          {provide: APP_BASE_HREF, useValue : '/' }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should display Incorrect email or password for nonexistant user', (done) => {

    component.userEmail = 'notrealuser';
    component.userPass = 'notrealpass';
    fixture.debugElement.injector.get(LoginComponent).login();

    fixture.debugElement.query(By.css('input.fadeIn.fourth')).nativeElement.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let errorMessage = fixture.debugElement.query(By.css('p#errorMessageLogin')).nativeElement.innerText;
      expect(errorMessage).toBe('Incorrect email or password.');
      done();
    });

  });

  xit('should display Input validation failed when fields are submitted empty', (done) => {

    component.userEmail = '';
    component.userPass = '';
    fixture.debugElement.injector.get(LoginComponent).login();

    fixture.debugElement.query(By.css('input.fadeIn.fourth')).nativeElement.click();
    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
      let errorMessage = fixture.debugElement.query(By.css('p#errorMessageLogin')).nativeElement.innerText;
      expect(errorMessage).toBe('Input validation failed.');
      done();    
    });

  });

  //there could be more input validation
  xit('login component should perform input validation to check that email is submitted in the correct format -- currently not implemented', (done) => {

    component.userEmail = '@';
    component.userPass = 'password';
    fixture.debugElement.injector.get(LoginComponent).login();

    fixture.debugElement.query(By.css('input.fadeIn.fourth')).nativeElement.click();
    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
      let errorMessage = fixture.debugElement.query(By.css('p#errorMessageLogin')).nativeElement.innerText;
      expect(errorMessage).toBe('Input validation failed.');
      done();
    });
    
  });

    //testing password length input validation
    xit('password length input validation -- currently not implemented', (done) => {

      component.userEmail = 'email';
      component.userPass = 'longstring12345678sdfghjedrfgtyhujsdfghjsdfghjdfgh';
      fixture.debugElement.injector.get(LoginComponent).login();
  
      fixture.debugElement.query(By.css('input.fadeIn.fourth')).nativeElement.click();
      fixture.detectChanges();
      
      fixture.whenStable().then(() => {
        let errorMessage = fixture.debugElement.query(By.css('p#errorMessageLogin')).nativeElement.innerText;
        expect(errorMessage).toBe('Input validation failed.');
        done();
      });
      
    });

  // it('should return "Incorrect email or password."', function(){
  //   component.userEmail="Garbage";
  //   component.userPass="Garbage";
  //   expect(component.login()).toEqual('string');
  //   //'Incorrect email or password.'
  // });
  // it('should return "Input validation failed."', function(){
  //   component.userEmail="";
  //   component.userPass="";
  //   expect(component.login()).toBe('Input validation failed.');
  // })

});
