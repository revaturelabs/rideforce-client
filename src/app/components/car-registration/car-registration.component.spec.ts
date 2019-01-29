import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRegistrationComponent } from './car-registration.component';
import { UserControllerService } from '../../services/api/user-controller.service';
import { User } from '../../models/user.model';
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

  it('should create car component', function() {
    expect(component).toBeTruthy();
  });

});
