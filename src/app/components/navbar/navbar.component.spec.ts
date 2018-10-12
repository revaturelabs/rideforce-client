import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';

import { NavbarComponent } from './navbar.component';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { UserControllerService } from '../../services/api/user-controller.service';
import { AuthService } from '../../services/auth.service';
import { Router, Routes } from '@angular/router';
import { Location } from '@angular/common';
import { Compiler, Injector, NgModuleFactoryLoader, Type, NgZone } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router/';
import { UrlSerializer, UrlTree } from '@angular/router/';

import {APP_BASE_HREF} from '@angular/common';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let auth: AuthService;
  const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
  // let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        // declarations: [ LoginComponent ],
        imports: [
          AppModule
          ],
        providers: [ {provide: APP_BASE_HREF, useValue : '/' }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    auth = TestBed.get(AuthService);
    fixture.detectChanges();
  });
  // beforeEach(() => {
  //   TestBed.configureTestingModule({providers: [HttpHandler, HttpClient,
  //      UserControllerService, AuthService, UrlSerializer, ChildrenOutletContexts, Location, Injector,
  //       NgModuleFactoryLoader, Compiler, {provide: Router, useValue: mockRouter}, NavbarComponent]});
  //   component = TestBed.get(NavbarComponent);
  //   auth = TestBed.get(AuthService);
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //   it('should log out (probably does anyway)!', () => {
  //     console.log('logout test');
  //     component.logout();
  //     component.sessionCheck();
  //     expect(component.session).toBeFalsy();
  //   });

  // it('should log in successfully', async () => {
  //   console.log('login test');
  //   // NgZone.run();
  //   await auth.authenticate('admin@revature.com', 'password', true);
  //   component.sessionCheck();
  //   expect(component.session).toBeTruthy();
  //   component.logout(); 
  //   component.sessionCheck();
  //   expect(component.session).toBeFalsy();
  // });
});
