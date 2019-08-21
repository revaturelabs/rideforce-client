import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { CarRegistrationComponent } from './car-registration.component';
import { UserControllerService } from '../../services/api/user-controller.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';

describe('CarRegistrationComponent', () => {
  let component: CarRegistrationComponent;
  let authService: AuthService;
  let userService: UserControllerService;
  let user: User;
  let fixture: ComponentFixture<CarRegistrationComponent>;

  const mockUserService = {
    getCurrentUser: () => of({ cars: ['BMW', 'Toyota']}),
    getCarById: (car) => of('BMW')
  }

    beforeEach(async() => {
      TestBed.configureTestingModule({
        imports: [
          AppModule
          ],
        providers: [
          {provide: APP_BASE_HREF, useValue : '/'},
          {provide: UserControllerService, useValue: mockUserService},
          
        ]
    })
    .compileComponents();    
    fixture = TestBed.createComponent(CarRegistrationComponent);
    component = fixture.componentInstance;    
    authService = TestBed.get(AuthService);
    // await authService.authenticate('jacky101@teleworm.us', 'Abc123@@');
    // await authService.authenticate('jljacko@outlook.com', 'johnPass');
    userService = TestBed.get(UserControllerService);
    // console.log('Authentication done (Car reg)');
    // await useServe.getCurrentUser().subscribe( u => {
    //     user = u;
    //     component.userObject = user;
    //   },
    //   e => {
    //     console.log('ERROR Testing User Login in car reg component spec');
    //     console.log(e);
    //   }
    // );
    spyOn(userService, 'getCurrentUser').and.callThrough();
    spyOn(userService, 'getCarById').and.callThrough();
    component.ngOnInit();

    console.log('(Car reg) User set to...');
    console.log(component.userObject);
    console.log('Done Printing (Car reg)');
    // expect(component.userObject).toBeTruthy();
  });

  it('should create car component', function() {
    expect(component).toBeTruthy();
  });

  it('should call the getCurrentUser method', function(){
    expect(userService.getCurrentUser).toHaveBeenCalled();
  });

  it('should call the get car method', function(){
    expect(userService.getCarById).toHaveBeenCalled();
  });

});