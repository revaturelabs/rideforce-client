import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountinfoComponent } from './accountinfo.component';
import { AppModule } from '../../app.module';
import { AuthService } from '../../services/auth.service';
import { UserControllerService } from '../../services/api/user-controller.service';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';
import {APP_BASE_HREF} from '@angular/common';

describe('AccountinfoComponent', () => {
  let component: AccountinfoComponent;
  // const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  // const mockZone = jasmine.createSpyObj('NgZone', ['run']);
  let fixture: ComponentFixture<AccountinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          AppModule
          ],
        providers: [ {provide: APP_BASE_HREF, useValue : '/' }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountinfoComponent);
    component = fixture.componentInstance;
    // auth = TestBed.get(AuthService);
    fixture.detectChanges();
  });
  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ AccountinfoComponent ],
  //     providers: [AuthService, UserControllerService],
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   TestBed.configureTestingModule({providers: [HttpHandler, HttpClient, AuthService, UploadService,
  //     {provide: NgZone, useValue: mockZone}, UserControllerService, AccountinfoComponent, {provide: Router, useValue: mockRouter}]});
  //   component = TestBed.get(AccountinfoComponent);
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should "Create a Car"!', () => {
    component.carMake = 'Toyoda';
    component.carModel = 'Corolla';
    component.carYear = 2008;
    component.createCar();
    expect(component.carObject.make).toEqual('Toyoda');
    expect(component.carObject.model).toEqual('Corolla');
    expect(component.carObject.year).toEqual(2008);
  });

  it('user object should create', () => {
    component.userObject = {
      id:1,
      firstName: "John",
      lastName: "Doe",
      email: "jdoe@gmail.com",
      password: "jdopass",
      photoUrl: "imgprofile",
      address: "12345 Pine Street, VA",
      office: '/offices/' + 1,
      dayStart: 0,
      startTime: 0, //adding non-existent element
      batchEnd: new Date().toISOString(),
      cars: [],
      active: 'ACTIVE',
      contactInfo: [],
      role: Role.Rider,
      bio: "My Bio"
    }
    expect(component.userObject).toBeTruthy();
  });
});
