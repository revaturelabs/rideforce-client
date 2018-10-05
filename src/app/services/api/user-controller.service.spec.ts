import { TestBed, inject } from '@angular/core/testing';

import { UserControllerService } from './user-controller.service';
import { HttpClientTestingModule } from '../../../../node_modules/@angular/common/http/testing';

describe('UserControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserControllerService]
    });
  });

  it('should be created', inject([UserControllerService], (service: UserControllerService) => {
    expect(service).toBeTruthy();
  }));
});
