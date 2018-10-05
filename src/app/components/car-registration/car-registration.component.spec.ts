import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRegistrationComponent } from './car-registration.component';
import { UserControllerService } from '../../services/api/user-controller.service';
// import { inject } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';

describe('CarRegistrationComponent', () => {
  let component: CarRegistrationComponent;
  // let fixture: ComponentFixture<CarRegistrationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HttpHandler, HttpClient, CarRegistrationComponent] });
    component = TestBed.get(CarRegistrationComponent);
  });

  it('should create car component', async(inject([UserControllerService],
    (userServe: UserControllerService) => {
      let user: User;
      userServe.getCurrentUser().subscribe(use => { user = use; } );
      const compUser = component.resetUser();
    expect(user).toEqual(component.userObject);
  })));

  it('should refresh the car registration fields', () => {
    component.refreshFields();
    expect(component.carMake).toEqual('');
    expect(component.carModel).toEqual('');
    // expect(component.carMake).toEqual('');
  });

});
