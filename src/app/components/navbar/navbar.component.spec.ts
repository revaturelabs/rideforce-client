import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { UserControllerService } from '../../services/api/user-controller.service';
import { AuthService } from '../../services/auth.service';
import { Router, Routes } from '@angular/router';
import { Location } from '@angular/common';
import { Compiler, Injector, NgModuleFactoryLoader, Type } from '@angular/core';
import { ChildrenOutletContexts } from '@angular/router/';
import { UrlSerializer, UrlTree } from '@angular/router/';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  // let fixture: ComponentFixture<NavbarComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ NavbarComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(NavbarComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [HttpHandler, HttpClient,
       UserControllerService, AuthService, UrlSerializer, ChildrenOutletContexts, Location, Injector,
        NgModuleFactoryLoader, Compiler, Router, NavbarComponent]});
    component = TestBed.get(NavbarComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
