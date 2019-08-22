import { HttpHandler, HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Role } from '../../models/role.model';
import { UsercardComponent } from './usercard.component';
import { AppModule } from '../../app.module';
import { UserControllerService } from '../../services/api/user-controller.service';
import { MatchingControllerService } from '../../services/api/matching-controller.service';

describe('UsercardComponent', () => {
  let component: UsercardComponent;
  let fixture: ComponentFixture<UsercardComponent>;

  //  let de: DebugElement;
  //  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [

      ],
      imports: [
        AppModule,
        RouterTestingModule.withRoutes([
          { path: '', component: UsercardComponent }])

      ],
      providers: [
        HttpClient, HttpHandler,
        MatchingControllerService, UserControllerService

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsercardComponent);
    component = fixture.componentInstance;

    //   de = fixture.debugElement.query(By.css('#swipeMain'));
    //   el = elRef.nativeElement;

    component.currentUser = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'jdoe@gmail.com',
      password: 'jdopass',
      photoUrl: 'imgprofile',
      location: {
        id: 12,
        address: '12345 Pine Street, VA',
        city: 'string',
        stateCode: 'string',
        zip: 'string',
        latitude: 675,
        longitude: -56778,
      },
      office: '/offices/' + 1,
      startTime: 0,
      batchEnd: new Date().toISOString(),
      cars: [],
      active: 'ACTIVE',
      contactInfo: [],
      role: Role.Rider,
      bio: 'My Bio',
    };

    component.currentSwipeCard = {
      user: component.currentUser,
      visible: true
    };

    fixture.detectChanges();

  });

  afterEach(() => {
    TestBed.resetTestingModule();
  });

  it('should create the usercard component', () => {
    expect(component).toBeTruthy();
  });

  it('hide image tests', () => {
    spyOn(component, 'hideImage');
    component.hideImage(true);
    expect(component.hideImage).toBeTruthy();
  });
  it('unhide image tests', () => {
    spyOn(component, 'hideImage');
    component.hideImage(false);
    expect(component.hideImage).toHaveBeenCalled();
  });
  it('swipe action right', () => {
    spyOn(component, 'swipe');
    component.swipe(component.SWIPE_ACTION.RIGHT, null);
    expect(component.swipe).toHaveBeenCalled();
  });
  it('swipe action left', () => {
    spyOn(component, 'swipe');
    component.swipe(component.SWIPE_ACTION.LEFT, null);
    expect(component.swipe).toHaveBeenCalled();
  });

  xit('get current user', () => {
    component.ngOnInit();
    expect(component.currentUser).toBeTruthy();
  });

  it('swiped', () => {
    component.animState = 'left';
    component.swiped();
    expect(component.animState).toEqual('center');

    component.animState = 'right';
    component.swiped();
    expect(component.animState).toEqual('center');
  });

  it('swiped', () => {
    component.animState = 'left';
    component.swiped();
    expect(component.animState).toEqual('center');

    component.animState = 'right';
    component.swiped();
    expect(component.animState).toEqual('center');
  });
});
