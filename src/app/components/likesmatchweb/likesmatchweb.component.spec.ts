import { TestBed } from '@angular/core/testing';

import { LikesmatchwebComponent, UserCard } from './likesmatchweb.component';
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

  it('should flip the card', () => {
    const card: UserCard = {
      user: null,
      choose: 'none',
      face: 'front'
    };
    component.likecards.push(card);
    expect(card.face).toBe('front');

    component.flipCard(card);
    expect(card.face).toBe('front-back');

    component.endFlipCard(card);
    expect(card.face).toBe('back');

    component.flipCard(card);
    expect(card.face).toBe('back-front');

    component.endFlipCard(card);
    expect(card.face).toBe('front');
  });
});
