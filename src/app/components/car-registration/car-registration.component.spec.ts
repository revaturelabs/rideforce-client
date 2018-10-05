import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRegistrationComponent } from './car-registration.component';
import { UserControllerService } from '../../services/api/user-controller.service';
// import { inject } from '@angular/core';
import { User } from '../../models/user.model';

describe('CarRegistrationComponent', () => {
  let component: CarRegistrationComponent;
  let fixture: ComponentFixture<CarRegistrationComponent>;




  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRegistrationComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', async(inject([UserControllerService],
    (userServe: UserControllerService) => {
      let user: User;
      userServe.getCurrentUser().subscribe(use => { user = use; } );
      const compUser = component.resetUser();
    expect(user).toEqual(component.userObject);
  })));


});
