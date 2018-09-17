import { TestBed, inject } from '@angular/core/testing';

import { MapsControllerService } from './maps-controller.service';

describe('MapsControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MapsControllerService]
    });
  });

  it('should be created', inject([MapsControllerService], (service: MapsControllerService) => {
    expect(service).toBeTruthy();
  }));
});
