import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesmatchwebComponent, UserCard } from './likesmatchweb.component';
import { MatchingControllerService } from '../../services/api/matching-controller.service';
import { UserControllerService } from '../../services/api/user-controller.service';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';

describe('LikesmatchwebComponent', () => {
  let component: LikesmatchwebComponent;
  let fixture: ComponentFixture<LikesmatchwebComponent>;

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
  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          AppModule
          ],
        providers: [
          {provide: APP_BASE_HREF, useValue : '/',
          LikesmatchwebComponent}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesmatchwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
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
