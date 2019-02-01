import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserControllerService } from '../../services/api/user-controller.service';
import { MatchingControllerService } from '../../services/api/matching-controller.service';
import { User } from '../../models/user.model';
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

  it('check values to not be null', () => {
    component.ngOnInit();

    expect(component.users.push).toBeTruthy();
    expect(component.sortedUsers).toBeTruthy();
    expect(component.loading).toBeTruthy();
  });

  it('call getMyLocation', () => {
    component.getMyLocation();
  });

  it('call shuffle', () => {
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

   var list: DriverCard[] = [];
   list.push(card1);
   list.push(card2);

   component.shuffle(list);
  });

  it('call calculateDistance', () => {
    // lat 1: 38.9661878
    // long 1: -77.41358919999999
    // lat 2: 38.9663139
    // long 2: -77.4154329

    // calculateDistance(long1,long2,lat1,lat2);
    expect(component.calculateDistance(-77.41358919999999,-77.4154329,38.9661878,38.9663139)).toBeTruthy();
  });

  it('call like', () => {
    // like(id, interest)
  
    expect(component.like(3031,0)).toBeTruthy(); // dislike
    expect(component.like(3031,1)).toBeTruthy(); // like
    expect(component.like(3031,2)).toBeTruthy(); // trash
    expect(component.like(3031,3)).toBeTruthy(); // clear
  });
});
