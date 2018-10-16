import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { UserControllerService } from '../../services/api/user-controller.service';
import { MatchingControllerService } from '../../services/api/matching-controller.service';
import { User } from '../../models/user.model';

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

  it('flipCard() test', () => {

        /** Represents the User selection item in the html page */
    interface UserCard {
      /** The User being represented */
      user: User;
      /** The status of the given user */
      choose: string;
      /** Link to profile picture of the user */
      face: String;
    }

    const card1: UserCard = {
      user: null,
      choose: 'none',
      face: 'front'
    };

    const card2: UserCard = {
      user: null,
      choose: 'none',
      face: 'back'
    };

    component.flipCard(card1);
    component.flipCard(card2);
    component.endFlipCard(card1);
    component.endFlipCard(card2);
  });

});
