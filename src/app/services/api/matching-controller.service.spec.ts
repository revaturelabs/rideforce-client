import { TestBed, inject } from '@angular/core/testing';

import { MatchingControllerService } from './matching-controller.service';

describe('MatchingControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MatchingControllerService]
    });
  });

  it('should be created', inject([MatchingControllerService], (service: MatchingControllerService) => {
    expect(service).toBeTruthy();
  }));
});
