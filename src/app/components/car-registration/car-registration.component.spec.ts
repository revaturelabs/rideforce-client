import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRegistrationComponent } from './car-registration.component';
import { UserControllerService } from '../../services/api/user-controller.service';
// import { inject } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';

xdescribe('CarRegistrationComponent', () => {
  let component: CarRegistrationComponent;
  let authService: AuthService;
  let useServe: UserControllerService;
  let user: User;
  let fixture: ComponentFixture<CarRegistrationComponent>;

    beforeEach(async() => {
      TestBed.configureTestingModule({
        imports: [
          AppModule
          ],
        providers: [
          {provide: APP_BASE_HREF, useValue : '/' }
        ]
    })
    .compileComponents();    
    fixture = TestBed.createComponent(CarRegistrationComponent);
    component = fixture.componentInstance;    
    authService = TestBed.get(AuthService);
    await authService.authenticate('jljacko@outlook.com', 'johnPass');
    useServe = TestBed.get(UserControllerService);
    console.log('Authentication done (Car reg)');
    await useServe.getCurrentUser().subscribe( u => {
        user = u;
        component.userObject = user;
      },
      e => {
        console.log('ERROR Testing User Login in car reg component spec');
        console.log(e);
      }
    );
    component.ngOnInit();

    console.log('(Car reg) User set to...');
    console.log(component.userObject);
    console.log('Done Printing (Car reg)');
    // expect(component.userObject).toBeTruthy();
  });

  // afterEach(async() => {
  //   await authService.logout();
  // });

  // it('should create car component', async(inject([UserControllerService],
  //   (userServe: UserControllerService) => {
  //     let user: User;
  //     userServe.getCurrentUser().subscribe(use => { user = use; } );
  //     const compUser = component.resetUser();
  //   expect(user).toEqual(component.userObject);
  // })));
  it('should create car component', function() {
    expect(component).toBeTruthy();
  });

  /* functions no longer exist
  it('should refresh the car registration fields', () => {
    component.refreshFields();
    expect(component.carMake).toEqual('');
    expect(component.carModel).toEqual('');
    // expect(component.carMake).toEqual('');
  });
  
  it('should add a car to the system', () => {
    component.carMake = ('testComp');
    component.carModel = ('testMod');
    component.carYear = (1999);

    component.addCarToUser(true);


    console.log('about to make expectations');
    expect(component.carObject.make).toBe('testComp');

    console.log('passed expect 1');
    expect(component.carObject.model).toBe('testMod');
    console.log('passed expect 2');
    expect(component.carObject.year).toBe(1999);
    console.log('passed expect 3');
    expect(component.carObject.id).toBeTruthy();
  });
  */
});
