import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesmatchwebComponent } from './likesmatchweb.component';
import { MatchingControllerService } from '../../services/api/matching-controller.service';
import { UserControllerService } from '../../services/api/user-controller.service';
import { HttpHandler, HttpClient } from '@angular/common/http';

describe('LikesmatchwebComponent', () => {
  let component: LikesmatchwebComponent;
  // let fixture: ComponentFixture<LikesmatchwebComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ LikesmatchwebComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LikesmatchwebComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [HttpHandler, HttpClient, UserControllerService,
       MatchingControllerService, LikesmatchwebComponent]});
    component = TestBed.get(LikesmatchwebComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
