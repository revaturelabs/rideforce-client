import { TestBed, inject } from '@angular/core/testing';

import { UserControllerService } from './user-controller.service';
import { HttpClientTestingModule } from '../../../../node_modules/@angular/common/http/testing';
import { Role } from '../../models/role.model';
import { WorkMail } from 'aws-sdk/clients/all';

describe('UserControllerService', () => {
  let regKey = "";
  let userObj = {
    id:1,
    firstName: "John",
    lastName: "Doe",
    email: "jdoe@gmail.com",
    password: "jdopass8",
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

  beforeEach(() => { // changed from beforeEach, shouldn't have to keep importing/providing
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserControllerService]
    });
  });

  it('should be created', inject([UserControllerService], (service: UserControllerService) => {
    expect(service).toBeTruthy();
  }));

  // test backend user creation
  // write another spec that both creates and deletes
  xit('should return created user', inject([UserControllerService], (service: UserControllerService) => {
    // delete user right away?
    expect(false).toBeTruthy;
  }));

  // test invalid passwords - not needed if frontend prevents invalid passwords
  xit('short password should return 406', inject([UserControllerService], (service: UserControllerService) => {
    //service.createUser(userObj, userObj.password, ) // generate key
    expect(false).toBeTruthy;
  }));

  // test duplicate email
  it('duplicate email should throw error', inject([UserControllerService], (service: UserControllerService) => {
    userObj.email = "chatnoir@mail.net"; // or any existing email
    this.regKey = service.getRegistrationKey().subscribe(
      data => {
        this.regKey = data;
      }
    );
    expect(service.createUser(userObj, userObj.password, this.regKey)).toThrowError;
  }));

});
