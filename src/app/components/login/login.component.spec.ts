import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { By } from '@angular/platform-browser';
import { LoginComponent } from '../login/login.component';
import {APP_BASE_HREF} from '@angular/common';

describe('LoginComponent', () => {
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

  it('should create the login component', () => {
    expect(component).toBeTruthy();
  });

  it('should display "User does not exist."', (done) => {

    component.userEmail = 'notrealuser';
    component.userPass = 'notrealpass';
    fixture.debugElement.injector.get(LoginComponent).login();

    fixture.debugElement.query(By.css('input.fadeIn.fourth')).nativeElement.click();
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      let errorMessage = fixture.debugElement.query(By.css('p#errorMessageLogin')).nativeElement.innerText;
      expect(errorMessage).toBe('User does not exist.');
      done();
    });

  });

  it('should display "Missing required parameter USERNAME"', (done) => {

    component.userEmail = '';
    component.userPass = 'notrealpass';
    fixture.debugElement.injector.get(LoginComponent).login();

    fixture.debugElement.query(By.css('input.fadeIn.fourth')).nativeElement.click();
    fixture.detectChanges();
    
    fixture.whenStable().then(() => {
      let errorMessage = fixture.debugElement.query(By.css('p#errorMessageLogin')).nativeElement.innerText;
      expect(errorMessage).toBe('Missing required parameter USERNAME');
      done();    
    });

  });

  // it('resetEmail but cannot access scope variables', () =>{
  //   component.userEmail = 'jedimasterdjd@yahoo.com';
  //   component.resetEmail();
  //   let errorMessage = fixture.debugElement.query(By.css('p#errorMessageLogin')).nativeElement.innerText;
  //   expect(errorMessage).toBeTruthy();
  // });

  // it('initModal', () => {
  //   component.initModal();
  //   expect(component.errorLink).toBeFalsy();
  //   expect(component.sentLink).toBeFalsy();
  //   expect(component.reEmail).toBe('');
  // });

  // it('resendEmail', () => {
  //   component.resendEmail();
  //   // needs to send in user and pool information
  //   expect(component.errorLink).toBeFalsy();
  //   expect(component.sentLink).toBeTruthy();
  // });
  
});
