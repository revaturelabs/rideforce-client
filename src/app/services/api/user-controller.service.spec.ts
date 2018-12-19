import { TestBed, inject } from '@angular/core/testing';

import { UserControllerService } from './user-controller.service';
import { HttpClientTestingModule } from '../../../../node_modules/@angular/common/http/testing';
import { Role } from '../../models/role.model';
import { WorkMail } from 'aws-sdk/clients/all';

describe('UserControllerService', () => {
  let regKey: string;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserControllerService]
    });
  });

  it('should be created', inject([UserControllerService], (service: UserControllerService) => {
    expect(service).toBeTruthy();
  }));

  // test backend user creation - use fixture?
  // write another spec that both creates and deletes?
  xit('should return created user', inject([UserControllerService], (service: UserControllerService) => {
    // delete user right away?
    expect(false).toBeTruthy;
  }));

  // Angular example
  /*
  it('#getObservableValue should return value from observable',
    (done: DoneFn) => {
    service.getObservableValue().subscribe(value => {
      expect(value).toBe('observable value');
      done();
    });
  });
  */
  // test key retrieval by expecting its length
  it('getRegistrationKey should get key from observable', inject([UserControllerService], (service: UserControllerService) => {
    this.regKey = service.getRegistrationKey().subscribe(
      value => {
        this.regKey = value;
        expect(this.regKey).toBe(207);
      }
    );

  }));

  // test duplicate email - currently must be run with above spec
  it('duplicate email should throw error', inject([UserControllerService], (service: UserControllerService) => {
    userObj.email = "chatnoir@mail.net"; // or any existing email
    expect(service.createUser(userObj, userObj.password, this.regKey)).toThrowError; // but is it the expected error?
  }));

  // test invalid passwords - not needed if frontend prevents invalid passwords
  xit('short password should return 406', inject([UserControllerService], (service: UserControllerService) => {
    //service.createUser(userObj, userObj.password, ) // generate key
    expect(false).toBeTruthy;
  }));

  

});
