import { UserControllerService } from './user-controller.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Role } from '../../models/role.model';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import {APP_BASE_HREF} from '@angular/common';
import { UserRegistration } from '../../models/user-registration.model';
import { environment } from '../../../environments/environment';
import { RegistrationToken } from '../../models/registration-token.model';
import { Office } from '../../models/office.model';

describe('UserControllerService', () => {
  let service: UserControllerService;
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
    service = TestBed.get(UserControllerService);
  });

  it('should be created', function() {
    expect(service).toBeTruthy();
  });

  it('#createUser should call an http post and return a string',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        spyOn(service,'createUser').and.callThrough();

        let testUR = new UserRegistration();
        service.createUser(testUR).subscribe(data => {
          const req = httpMock.expectOne(environment.userUrl + '/users/');
          expect(req.request.method).toEqual('POST');
        });
        
        expect(service.createUser).toHaveBeenCalled();
  }));

  it('#getAllUsers',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        spyOn(service,'getAllUsers').and.callThrough();

        let returnValue = service.getAllUsers();
        
        expect(returnValue).not.toBeNull();
  }));
  
  it('#getUserById should call an http get',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        spyOn(service,'getUserById').and.callThrough();

        service.getUserById(1).subscribe(data => {
          const req = httpMock.expectOne(environment.userUrl + '/users/');
          expect(req.request.method).toEqual('GET');
        });
        
        expect(service.getUserById).toHaveBeenCalled();
  }));  

  it('#getUserByEmail',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        spyOn(service,'getUserByEmail').and.callThrough();

        let returnValue = service.getUserByEmail('jedimasterdjd@yahoo.com');
        
        expect(returnValue).not.toBeNull();
        expect(returnValue).toBeDefined();
  }));

  it('#getCurrentUser should call an http get',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        spyOn(service,'getCurrentUser').and.callThrough();

        service.getCurrentUser().subscribe(data => {
          const req = httpMock.expectOne(environment.userUrl + '/login');
          expect(req.request.method).toEqual('GET');
        });
        
        expect(service.getCurrentUser).toHaveBeenCalled();
  }));  

  it('#getCurrentUserObservable',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        spyOn(service,'getCurrentUserObservable').and.callThrough();

        let returnValue = service.getCurrentUserObservable();
        
        expect(returnValue).not.toBeNull();
        expect(returnValue).toBeDefined();
  }));

  it('#getRegistrationKey should call POST and return',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        spyOn(service,'getRegistrationKey').and.callThrough();
        let testRTR = new RegistrationToken();
        let testOffice = new Office();
        testOffice.id = 1;
        testRTR.office = testOffice;
        let returnValue;
        service.getRegistrationKey(testRTR).subscribe(data => {
          const req = httpMock.expectOne(environment.userUrl + '/login');
          expect(req.request.method).toEqual('POST');
          returnValue = data;
          expect(returnValue).not.toBeNull();
          expect(returnValue).toBeDefined();
        });            
        expect(service.getRegistrationKey).toHaveBeenCalled();
  }));

  it('#update',
    inject([HttpTestingController],
      (httpMock: HttpTestingController) => {
        spyOn(service,'update').and.callThrough();

        let returnValue = service.update();
        
        expect(returnValue).not.toBeNull();
        expect(returnValue).toBeDefined();
  }));

    it('#updateBio',
  inject([HttpTestingController],
    (httpMock: HttpTestingController) => {
      spyOn(service,'updateBio').and.callThrough();

      let returnValue = service.updateBio('Test Bio');
      
      expect(returnValue).not.toBeNull();
      expect(returnValue).toBeDefined();
      expect(service.principal.bio).toEqual('Test Bio')
    }));

});