import { HttpClient, HttpHandler } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ViewUsersComponent } from './view-users.component';
import { SearchUsersComponent } from '../search-users/search-users.component';

describe('ViewUsersComponent', () => {
  let component: ViewUsersComponent;
  let fixture: ComponentFixture<ViewUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SearchUsersComponent,
        ViewUsersComponent ],
        imports: [
          FormsModule
        ],
        providers: [
          HttpClient, HttpHandler
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // repeat of view-profile
  it('calling switchRole', () => {
    sessionStorage.setItem('role', 'DRIVER');
    component.switchRole();
    expect(sessionStorage.getItem('role')).toBe('RIDER');

    sessionStorage.setItem('role', 'RIDER');
    component.switchRole();
    expect(sessionStorage.getItem('role')).toBe('DRIVER');
  });

  // repeat 
  it('calling switchState', () => {
    sessionStorage.setItem('active', 'ACTIVE');
    component.switchState();
    expect(sessionStorage.getItem('active')).toBe('INACTIVE');

    sessionStorage.setItem('active', 'INACTIVE');
    component.switchState();
    expect(sessionStorage.getItem('active')).toBe('ACTIVE');
  });

  it('getting fakeRole', () => {
    sessionStorage.setItem('role','DRIVER');
    component.getRole();
    expect(component.currentRole).toEqual('DRIVER');
  });

  it('getting fakeState', () => {
    sessionStorage.setItem('active', 'ACTIVE');
    component.getState();
    expect(component.currentState).toEqual('ACTIVE');
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

  /* Throws an infinite loop */
  // similar to view-profile
  xit('updateUserStatus', () => {
    component.confirmUserStatus(3031, 'ACTIVE');
    component.updateUserStatus();
    expect(component.active).toEqual('DISABLED');

    component.confirmUserStatus(3031, 'DISABLED');
    component.updateUserStatus();
    expect(component.active).toEqual('ACTIVE');
  });

  // similar to view-profile
  xit('makeRider', () => {
    expect(component.makeRider()).toBeTruthy();
  });

  // similar to view-profile
  xit('makeAdmin', () => {
    expect(component.makeTrainer()).toBeTruthy();
  });

  // similar to view-profile
  xit('makeTrainer', () => {
    expect(component.makeTrainer()).toBeTruthy();
  });

  xit('makeDriver', () => {
    expect(component.makeDriver()).toBeTruthy();
  });

  xit('reload function', () => {
    expect(component.reload()).toBeTruthy();
  });
});
