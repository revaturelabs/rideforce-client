import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserControllerService } from '../../services/api/user-controller.service';
import { MatchingControllerService } from '../../services/api/matching-controller.service';
import { User } from '../../models/user.model';
import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';
import { UsermatchwebComponent } from './usermatchweb.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

describe('UsermatchwebComponent', () => {
  let component: UsermatchwebComponent;
  let fixture: ComponentFixture<UsermatchwebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsermatchwebComponent],
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'landing', component: UsermatchwebComponent }]),
        FormsModule,
        NgxSpinnerModule,
      ],
      providers: [HttpClient, HttpHandler,
        MatchingControllerService, UserControllerService]
    })
      .compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(UsermatchwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*   beforeEach(() => {
      TestBed.configureTestingModule({providers: [HttpHandler, HttpClient, MatchingControllerService,
        UserControllerService, UsermatchwebComponent],
        declarations:[UsermatchwebComponent]});
      component = TestBed.get(UsermatchwebComponent);
    }); */


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInit() test', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });
  it('flipCard() test', () => {
    /** Represents the User selection item in the html page */
    interface DriverCard {
      /** The User being represented */
      user: User;
      /** The status of the given user */
      choose: string;
      /** Link to profile picture of the user */
      face: String;
      distance: number;
    }
    const card1: DriverCard = {
      user: null,
      choose: 'none',
      face: 'front',
      distance: 1
    };
    const card2: DriverCard = {
      user: null,
      choose: 'none',
      face: 'back',
      distance: 5
    };
    component.flipCard(card1);
    component.flipCard(card2);
    component.endFlipCard(card1);
    component.endFlipCard(card2);
  });
});
