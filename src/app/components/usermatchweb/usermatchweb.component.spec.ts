import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { UserControllerService } from '../../services/api/user-controller.service';
import { MatchingControllerService } from '../../services/api/matching-controller.service';

import { UsermatchwebComponent } from './usermatchweb.component';

describe('UsermatchwebComponent', () => {
  let component: UsermatchwebComponent;
  // let fixture: ComponentFixture<UsermatchwebComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ UsermatchwebComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(UsermatchwebComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [HttpHandler, HttpClient, MatchingControllerService,
       UserControllerService, UsermatchwebComponent],
       declarations:[UsermatchwebComponent]});
    component = TestBed.get(UsermatchwebComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() test', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('like() test', () => {
    component.like(1,1);
    expect(component).toBeTruthy();
  });

  it('flipCard() test', () => {
    component.like(1,1);
    expect(component).toBeTruthy();
  });

});
