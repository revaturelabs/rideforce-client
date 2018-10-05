import { TestBed, inject } from '@angular/core/testing';

import { MapsControllerService } from './maps-controller.service';
import { HttpClientTestingModule } from '../../../../node_modules/@angular/common/http/testing';

describe('MapsControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MapsControllerService]
    });
  });

  it('should be created', inject([MapsControllerService], (service: MapsControllerService) => {
    expect(service).toBeTruthy();
  }));
});
