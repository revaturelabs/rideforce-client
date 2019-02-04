import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { UserControllerService } from '../../services/api/user-controller.service';
import { ContactInfo } from '../../models/contact-info.model';
import { ViewProfileComponent } from './view-profile.component';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { NgbModule } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';

describe('ViewProfileComponent', () => {
  let component: ViewProfileComponent;
  let fixture: ComponentFixture<ViewProfileComponent>;

  //Got rid of DateFormatPipe from providers to make code work.
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [HttpHandler, HttpClient, 
       UserControllerService, ViewProfileComponent],
      declarations:[ViewProfileComponent],
    imports:[FormsModule, NgbModule]}).compileComponents();
    // component = TestBed.get(ViewProfileComponent);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make profile editable', () => {
    component.edit();
    fixture.detectChanges();
    // fixture.whenStable().then((done) => {
    //   const inputUser: HTMLInputElement = fixture.nativeElement.querySelector("#firstName");
    //   const e: Event = document.createEvent("Event");
    //   e.initEvent("input", false, false);
    //   inputUser.value = "Bob";
    //   inputUser.dispatchEvent(e);
    //   fixture.detectChanges();
    //   done();
    // });
  });

  it('calling switchRole', () => {
    sessionStorage.setItem('role', 'DRIVER');
    component.switchRole();
    expect(sessionStorage.getItem('role')).toBe('RIDER');

    sessionStorage.setItem('role', 'RIDER');
    component.switchRole();
    expect(sessionStorage.getItem('role')).toBe('DRIVER');
  });

  it('calling switchState', () => {
    sessionStorage.setItem('active', 'ACTIVE');
    component.switchState();
    expect(sessionStorage.getItem('active')).toBe('INACTIVE');

    sessionStorage.setItem('active', 'INACTIVE');
    component.switchState();
    expect(sessionStorage.getItem('active')).toBe('ACTIVE');
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

  it('makeRider', () => {
      expect(component.makeRider(3031)).toBeTruthy();
    });

  it('makeAdmin', () => {
    expect(component.makeAdmin(3031)).toBeTruthy();
    });

  it('makeTrainer', () => {
    expect(component.makeAdmin(3031)).toBeTruthy();
  });

  it('updateUserStatus', () => {
      component.updateUserStatus(3031, 'ACTIVE');
      expect(component.active).toEqual('DISABLED');
      
      component.updateUserStatus(3031, 'DISABLED');
      expect(component.active).toEqual('ACTIVE');
    });
});
