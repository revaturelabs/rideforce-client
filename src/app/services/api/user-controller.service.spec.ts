import { TestBed, inject } from '@angular/core/testing';

import { UserControllerService } from './user-controller.service';

describe('UserControllerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserControllerService]
    });
  });

  it('should be created', inject([UserControllerService], (service: UserControllerService) => {
    expect(service).toBeTruthy();
  }));
});
