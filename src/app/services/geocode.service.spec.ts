import { TestBed } from '@angular/core/testing';

import { GeocodeService } from './geocode.service';
import { LatLngLiteral } from '@agm/core';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

describe('GeocodeService', () => {
  beforeEach(() => TestBed.configureTestingModule({ providers: [GeocodeService]}));

  it('should be created', () => {
    const service: GeocodeService = TestBed.get(GeocodeService);
    expect(service).toBeTruthy();
  });

  it('should return geocode from address', async function() {
    const service: GeocodeService = TestBed.get(GeocodeService);
    const add = '508 Pride Ave., Herndon VA, 20170';
    // let lInfo: LatLngLiteral;

    await service.geocode(add).subscribe( l => {
      expect(l).toBeTruthy();
    });

    expect().nothing();
  });

  // it('should return geocode from Latitude and Longitide', async function() {
  //   const service: GeocodeService = TestBed.get(GeocodeService);

  //   const add = '508 Pride Ave., Herndon VA, 20170';


  //   // let latLong: google.maps.LatLng;
  //   // latLong.lat = 35.5;
  //   // latLong.lng = 35.4;
  //   // let lInfo: LatLngLiteral;

  //   await service.geocode(add).subscribe( l => {
  //     service.reverseGeocode(l).subscribe( g => {
  //     expect(g).toBeTruthy();
  //   });
  //   });
  //   expect().nothing();
  // });

});
