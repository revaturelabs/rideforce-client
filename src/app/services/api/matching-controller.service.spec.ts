import { TestBed, inject } from '@angular/core/testing';

import { MatchingControllerService } from './matching-controller.service';
import { HttpClientTestingModule } from '../../../../node_modules/@angular/common/http/testing';

describe('MatchingControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MatchingControllerService]
    });
  });

  it('should be created', inject([MatchingControllerService], (service: MatchingControllerService) => {
    expect(service).toBeTruthy();
  }));
});
