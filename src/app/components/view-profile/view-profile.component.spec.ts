import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { UserControllerService } from '../../services/api/user-controller.service';
import { ContactInfo } from '../../models/contact-info.model';
import { ViewProfileComponent } from './view-profile.component';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { NgbModule } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { Role } from '../../models/role.model';
import { RouterTestingModule } from '@angular/router/testing';

describe('ViewProfileComponent', () => {
  let component: ViewProfileComponent;
  let fixture: ComponentFixture<ViewProfileComponent>;

  //Got rid of DateFormatPipe from providers to make code work.
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [HttpHandler, HttpClient, 
       UserControllerService, ViewProfileComponent ],
      declarations:[ViewProfileComponent],
    imports:[FormsModule, NgbModule, RouterTestingModule]}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calling switchRole', () => {
    component.principal.role = Role.Driver;
    component.switchRole();
    expect(component.principal.role).toEqual(Role.Rider);

    component.principal.role = Role.Rider;
    component.switchRole();
    expect(component.principal.role).toEqual(Role.Driver);
  });

  it('calling switchState', () => {
    component.principal.active = 'ACTIVE';
    component.switchState();
    expect(component.principal.active).toEqual('INACTIVE');

    component.principal.active = 'INACTIVE';
    component.switchState();
    expect(component.principal.active).toEqual('ACTIVE');
  });

  it('change the existing bio status', () => {
    component.existingBioStatus = false;
    component.changeExistingBioStatus();
    expect(component.existingBioStatus).toEqual(true);
  });

  it('Set up contact information', () => {
    const input: ContactInfo = {
      id: null,
      type: null,
      info: null
    };

    component.addContact();
    expect(component.contactInfoArray[0]).toEqual(input);
  });

  /*
    Make sure when running the following test cases: makeRider, makeAdmin, makeTrainer
    to hit "cancel" on the pop-up instead of "ok". When "ok" is selected, it will auto-refresh.
    Line 123 will explain how to test those cases.
  */
  it('makeRider', () => {
      expect(component.makeRider(3031)).toBeUndefined();
  });

  it('makeAdmin', () => {
    expect(component.makeAdmin(3031)).toBeUndefined();
  });

  it('makeTrainer', () => {
    expect(component.makeTrainer(3031)).toBeUndefined();
  });

  it('updateUserStatus', () => {
      component.updateUserStatus(3031, 'ACTIVE');
      expect(component.active).toEqual('DISABLED');
      
      component.updateUserStatus(3031, 'DISABLED');
      expect(component.active).toEqual('ACTIVE');
  });

  it('get current Role', () => {
    component.principal.role = Role.Driver;
    component.getRole();
    expect(component.currentRole).toEqual(component.principal.role);
  });

  it('get current State', () =>{
    component.principal.active = 'ACTIVE';
    component.getState();
    expect(component.currentState).toEqual('ACTIVE');
  });

  it('if role isnt driver or rider for switchrole', () => {
    component.principal.role = Role.Trainer;
    expect(component.switchRole()).toBeUndefined();
  });

  it('if role isnt driver or rider for switchstate', () => {
    component.principal.active = 'NOPE';
    expect(component.switchState()).toBeUndefined();
  });

  it('should call edit', () => {
    // edit just removes atrribute
    expect(component.edit()).toBeUndefined();
  });

  /* 
  x'd the functions below because they all have a location.reload which messes with test case
  To run these test case, comment out "location.reload(true);" in the actual component
  and remove the "x" from the below cases
  */
  xit('updateBio', () => {
    component.updateBio();
    expect(component.principal.bio).toEqual('I have a Bio now..');
  });

  xit('makeAdmin without reload', () => {
    /* 
    just calls the function again so then you can 
    hit "ok" on the first alert and "cancel" on the second 
    */
    expect(component.makeAdmin(3031)).toBeTruthy();
  });

  xit('makeTrainer without reload', () => {
    /* 
    just calls the function again so then you can 
    hit "ok" on the first alert and "cancel" on the second 
    */
    expect(component.makeTrainer(3031)).toBeTruthy();
  });

  xit('makeRider without reload', () => {
    /* 
    just calls the function again so then you can 
    hit "ok" on the first alert and "cancel" on the second 
    */
    expect(component.makeRider(3031)).toBeTruthy();
  });

  xit('updateUserStatus without reload', () => {
    /*
    just calls the function again so then you can
    hit "ok" on the 2/3 of the alerts and hit "cancel" 
    on one of the alerts
    */
    component.updateUserStatus(3031, 'DISABLED');
    expect(component.active).toEqual('ACTIVE');
  });
});
