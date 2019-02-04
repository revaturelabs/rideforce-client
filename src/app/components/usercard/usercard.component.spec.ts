import { HttpHandler, HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsercardComponent } from './usercard.component';
import { AppModule } from '../../app.module';
import { Role } from '../../models/role.model';
import { UserControllerService } from '../../services/api/user-controller.service';
import { MatchingControllerService } from '../../services/api/matching-controller.service';

describe('UsercardComponent', () => {
  let component: UsercardComponent;
  let fixture: ComponentFixture<UsercardComponent>;

//  let de: DebugElement;
//  let el: HTMLElement;

component.currentUser = {
    id:1,
    firstName: "John",
    lastName: "Doe",
    email: "jdoe@gmail.com",
    password: "jdopass",
    photoUrl: "imgprofile",
    address: "12345 Pine Street, VA",
    office: '/offices/' + 1,
    startTime: 0,
    batchEnd: new Date().toISOString(),
    cars: [],
    active: 'ACTIVE',
    contactInfo: [],
    role: Role.Rider,
    bio: "My Bio"
};

component.currentSwipeCard = {
  user : component.currentUser,
  visible : true
};


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
        //        {
        //          provide: APP_BASE_HREF, useValue: '/',
        //          UsercardComponent
        //        },
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



    fixture.detectChanges();

/*    component.currentUser = {
      id:1,
      firstName: "John",
      lastName: "Doe",
      email: "jdoe@gmail.com",
      password: "jdopass",
      photoUrl: "imgprofile",
      address: "12345 Pine Street, VA",
      office: '/offices/' + 1,
      startTime: 0,
      batchEnd: new Date().toISOString(),
      cars: [],
      active: 'ACTIVE',
      contactInfo: [],
      role: Role.Rider,
      bio: "My Bio"
  }*/

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hide image tests', () => {

    fixture.detectChanges();


   //    const spyObj = jasmine.createSpy('nativeElement');
    // let elRef: ElementRef;
    // component.swipeCardMain = elRef;
    component.hideImage(true);
    //expect(component.swipeCardMain).toBeTruthy();
  });
  it('unhide image tests', () => {
    component.hideImage(false);
  });
  it('swipe action right', () => {
    component.swipe(component.SWIPE_ACTION.RIGHT, null);
  })
  it('swipe action left', () => {
    component.swipe(component.SWIPE_ACTION.LEFT, null);
  })
});
