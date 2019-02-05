import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';
import {APP_BASE_HREF} from '@angular/common';
import { GeocodeService } from './geocode.service';

fdescribe('GeocodeService', () => {
  let service: GeocodeService;
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
    service = TestBed.get(GeocodeService);
  });

  it('should be created', () => {
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

});
