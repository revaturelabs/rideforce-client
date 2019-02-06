import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ViewUsersComponent } from './view-users.component';
import { SearchUsersComponent } from '../search-users/search-users.component';
import { Role } from '../../models/role.model';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientTestingModule } from '../../../../node_modules/@angular/common/http/testing'
import { AppModule } from '../../app.module';

fdescribe('ViewUsersComponent', () => {
  let component: ViewUsersComponent;
  let fixture: ComponentFixture<ViewUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          AppModule,
          HttpClientTestingModule
          ],
        providers: [ {provide: APP_BASE_HREF, useValue : '/' }
        ]
    })
    .compileComponents();
  })); 

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create view-users component', () => {
    expect(component).toBeTruthy();
  });

  // repeat of view-profile
  it('calling switchRole', () => {
    component.principal.role = Role.Driver;
    component.switchRole();
    expect(component.principal.role).toEqual(Role.Rider);

    component.principal.role = Role.Rider;
    component.switchRole();
    expect(component.principal.role).toEqual(Role.Driver);
  });

  // repeat 
  it('calling switchState', () => {
    component.principal.active = 'ACTIVE';
    component.switchState();
    expect(component.principal.active).toEqual('INACTIVE');

    component.principal.active = 'INACTIVE';
    component.switchState();
    expect(component.principal.active).toEqual('ACTIVE');
  });

  it('getting fakeRole', () => {
    component.principal.role = Role.Driver;
    component.getRole();
    expect(component.currentRole).toEqual(component.principal.role);
  });

  it('getting fakeState', () => {
    component.principal.active = 'ACTIVE';
    component.getState();
    expect(component.currentState).toEqual('ACTIVE');
  });

  it('getUsers', () => {
    component.principal.role = Role.Admin;
    expect(component.getUsers()).toBeTruthy();

    component.principal.role = Role.Trainer;
    expect(component.getUsers()).toBeTruthy();
  });

  it('confirmUserStatus', () => {
    component.confirmUserStatus(3031, 'ACTIVE');
    expect(component.userId).toEqual(3031);
    expect(component.userStatus).toEqual('ACTIVE');
  });

  it('setting userId', () => {
    component.setUserId(3031);
    expect(component.userId).toEqual(3031);
  });

  // similar to view-profile
  it('updateUserStatus', () => {
    component.userStatus = 'ACTIVE';
    component.updateUserStatus();
    expect(component.active).toEqual('DISABLED');

    component.userStatus = 'DISABLED';
    component.updateUserStatus();
    expect(component.active).toEqual('ACTIVE');
  });

  // similar to view-profile
  it('makeRider', () => {
    component.userId = 3031;
    expect(component.makeRider()).toBeTruthy();
  });

  // similar to view-profile
  it('makeAdmin', () => {
    component.userId = 3031;
    expect(component.makeTrainer()).toBeTruthy();
  });

  // similar to view-profile
  it('makeTrainer', () => {
    component.userId = 3031;
    expect(component.makeTrainer()).toBeTruthy();
  });

  it('makeDriver', () => {
    component.userId = 3031;
    expect(component.makeDriver()).toBeTruthy();
  });

  xit('reload function', () => {
    // a hard coded reload function. Not really testable
    expect(component.reload()).toBeTruthy();
  });
});
