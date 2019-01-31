import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AccountinfoComponent } from './accountinfo.component';
import { AppModule } from '../../app.module';
import { Role } from '../../models/role.model';
import {APP_BASE_HREF} from '@angular/common';
import { ContactInfo } from '../../models/contact-info.model';
import { Office } from '../../models/office.model';

describe('AccountinfoComponent', () => {
  let component: AccountinfoComponent;
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#createUserObject should create a user', () => {
    spyOn(component, 'createUserObject').and.callThrough();

    component.token = 'XcvFXcvFXcvFXcvFXcvFXcvFXcvF';
    component.firstName = 'John';
    component.lastName = 'Doe';
    component.username = 'jdoe@gmail.com';
    component.password = 'jdopass';
    component.imageSrc = 'imgprofile';
    component.address2 = '12345 Pine Street, VA';
    let testOffice = new Office();
    testOffice.address = '1234 Fake Street, VA';
    testOffice.id = 1;
    testOffice.name = 'Fake Office';
    component.officeObject = testOffice;
    component.batchEnd = new Date().toISOString();
    component.timeSelect = 0;
    component.roleObject = Role.Rider;
    component.bio = 'My Bio';

    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();


    fixture.whenStable().then(() => {
      expect(component.createUserObject).toHaveBeenCalled();
      expect(component.userObject).toBeTruthy();
    });
  });

  // should same spec test both add and removeContact?
  it('addContact should push ContactInfo object into array', () => { 
    component.addContact();
    const contact: ContactInfo = {
      id: null,
      type: null,
      info: null
    }
    expect(component.contactInfoArray.pop()).toEqual(contact);
  })

  it('removeContact should splice ContactInfo object from array', () => {
    const contact: ContactInfo = {
      id: null,
      type: null,
      info: null
    }
    component.contactInfoArray.push(contact);
    expect(component.contactInfoArray).toContain(contact);
    component.removeContact(contact);
    expect(component.contactInfoArray).not.toContain(contact);
  })

  xit('isRider should set role as rider', () => {
    component.isRider(); // will throw without a DOM
    expect(component.roleObject).toBe(Role.Rider);
  });

  xit('invalid password should display a message', () => {
    expect(false).toBe(true);
  })
});
