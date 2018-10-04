import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { AppModule } from '../../app.module';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        AppModule
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
