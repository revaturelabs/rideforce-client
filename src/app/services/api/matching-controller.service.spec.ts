import { TestBed, inject } from '@angular/core/testing';
import { MatchingControllerService } from './matching-controller.service';
import { HttpClientTestingModule } from '../../../../node_modules/@angular/common/http/testing';

import { User } from "../../../app/models/user.model";
import { Observable, of } from 'rxjs';
import { Link } from '../../models/link.model';
describe('MatchingControllerService', () => {

  var testBedService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MatchingControllerService]
    });

    testBedService = TestBed.get(MatchingControllerService);
  });

  it('should be created', inject([HttpClientTestingModule, MatchingControllerService]
    , (httpClient: HttpClientTestingModule,service: MatchingControllerService) => {
    expect(service).toBeTruthy();
  }));

  it('service inject should be same as testbedservice',inject([MatchingControllerService]
    ,(injectServ:MatchingControllerService)=>
  expect(injectServ).toBe(testBedService))
  );

  it('should get some data', inject([MatchingControllerService]
    , (service:MatchingControllerService)=>{
    var userLinks;
    testBedService.getLikedDrivers(75).subscribe(
      data2=>{
        userLinks=data2;
        expect(userLinks[0]).toBeTruthy();
      }
    );
    
    //toBe(true, 'instance of Observable');
  }));
    it('should return empty', function(){
      var data:Observable<Link<User>[]>;
      testBedService.getLikedDrivers(0).subscribe(
        (data2)=>{
          data=data2;
          expect(data).toBeNull();
        }
      )
    });
});
