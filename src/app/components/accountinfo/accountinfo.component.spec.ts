import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountinfoComponent } from './accountinfo.component';
import { AppModule } from '../../app.module';
import { Role } from '../../models/role.model';
import {APP_BASE_HREF} from '@angular/common';
import { ContactInfo } from '../../models/contact-info.model';

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
      startTime: 0,
      batchEnd: new Date().toISOString(),
      cars: [],
      active: 'ACTIVE',
      contactInfo: [],
      role: Role.Rider,
      bio: "My Bio"
    }
    expect(component.userObject).toBeTruthy();
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
