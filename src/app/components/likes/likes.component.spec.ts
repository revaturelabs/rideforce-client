import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesComponent } from './likes.component';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { UserControllerService } from '../../services/api/user-controller.service';
import { MatchingControllerService } from '../../services/api/matching-controller.service';
import { AuthService } from '../../services/auth.service';

describe('LikesComponent', () => {
  let component: LikesComponent;
  let authService: AuthService;
  // let fixture: ComponentFixture<LikesComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ LikesComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LikesComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  beforeEach(async () => {
    TestBed.configureTestingModule({providers: [HttpHandler, HttpClient, MatchingControllerService, AuthService,
       UserControllerService, LikesComponent]});
    component = TestBed.get(LikesComponent);
    authService = TestBed.get(AuthService);
    await authService.authenticate('jljacko@outlook.com', 'johnPass');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the User', () => {
    component.ngOnInit();
    expect(component.currentUser).toBeTruthy();
  });
});
