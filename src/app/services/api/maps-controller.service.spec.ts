import { TestBed } from '@angular/core/testing';
import { MapsControllerService } from './maps-controller.service';
import { HttpClientTestingModule } from '../../../../node_modules/@angular/common/http/testing';
import { RouteInfo } from '../../models/route-info.model';

fdescribe('MapsControllerService', () => {
  let service: MapsControllerService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MapsControllerService]
    });
    service = TestBed.get(MapsControllerService);
  });

  it('should be created', function() {
    expect(service).toBeTruthy();
  });

  xit('should retrieve route information', async function() {
    const add1 = '378 Colonel Myers Dr. N, Martinsburg WV, 25404';
    const add2 = '508 Pride Ave., Herndon VA, 20170';
    // const add2 =  
    // {addressID: '23',
    // address: '123 something',
    // city: 'New York',
    // stateCode: 'NY',
    // zip: '12356',
    // latitude: 234,
    // longitude: -1232,
    // };
    let rInfo: RouteInfo;

    await service.getRoute(add1, add2).subscribe( r => {
      rInfo = r;
      expect(rInfo).toBeTruthy();
    },
    () => fail()
    );

    expect().nothing();

  });

  it('should return latitude and logitude information', async function() {
    const add = '508 Pride Ave., Herndon VA, 20170';
    // let lInfo: LatLngLiteral;

    await service.getDistance(add).subscribe( l => {
      expect(l).toBeTruthy();
    });

    expect().nothing();
  });
});
