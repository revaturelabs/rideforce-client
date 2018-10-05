import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesComponent } from './likes.component';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { UserControllerService } from '../../services/api/user-controller.service';
import { MatchingControllerService } from '../../services/api/matching-controller.service';

describe('LikesComponent', () => {
  let component: LikesComponent;
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
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [HttpHandler, HttpClient, MatchingControllerService,
       UserControllerService, LikesComponent]});
    component = TestBed.get(LikesComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
