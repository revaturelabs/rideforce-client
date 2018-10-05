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
        providers:[
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

  it('should display Incorrect email or password for nonexistant user', () => {

    component.userEmail = 'notrealuser';
    component.userPass = 'notrealpass';
    
    let test = fixture.debugElement.query(By.css('input#login')).nativeElement;
    fixture.debugElement.query(By.css('input.fadeIn.fourth')).nativeElement.click();

    fixture.detectChanges();
    
    fixture.whenStable().then(() => {

      let test1 = fixture.debugElement.query(By.css('p#errorMessageLogin')).nativeElement.innerText;
      expect(test1).toBe('Incorrect email or password.');      
    })

  });

  it('should display Input validation failed when fields are submitted empty', () => {

    component.userEmail = '';
    component.userPass = '';
    
    let test = fixture.debugElement.query(By.css('input#login')).nativeElement;
    fixture.debugElement.query(By.css('input.fadeIn.fourth')).nativeElement.click();

    fixture.detectChanges();
    
    fixture.whenStable().then(() => {

      let test1 = fixture.debugElement.query(By.css('p#errorMessageLogin')).nativeElement.innerText;
      expect(test1).toBe('Input validation failed.');      
    })

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
