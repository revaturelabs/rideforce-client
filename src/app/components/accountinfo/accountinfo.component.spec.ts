import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountinfoComponent } from './accountinfo.component';
import { AppModule } from '../../app.module';
import { AuthService } from '../../services/auth.service';
import { UserControllerService } from '../../services/api/user-controller.service';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { NgZone } from '@angular/core';
import { UploadService } from '../../services/upload.service';
import { Router } from '@angular/router';

describe('AccountinfoComponent', () => {
  let component: AccountinfoComponent;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  const mockZone = jasmine.createSpyObj('NgZone', ['run']);
  // let fixture: ComponentFixture<AccountinfoComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ AccountinfoComponent ],
  //     providers: [AuthService, UserControllerService],
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AccountinfoComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [HttpHandler, HttpClient, AuthService, UploadService,
      {provide: NgZone, useValue: mockZone}, UserControllerService, AccountinfoComponent, {provide: Router, useValue: mockRouter}]});
    component = TestBed.get(AccountinfoComponent);
  });

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
});
