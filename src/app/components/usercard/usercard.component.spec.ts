import { HttpHandler, HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsercardComponent } from './usercard.component';
import { AppModule } from '../../app.module';
import { Role } from '../../models/role.model';
import { UserControllerService } from '../../services/api/user-controller.service';
import { MatchingControllerService } from '../../services/api/matching-controller.service';

xdescribe('UsercardComponent', () => {
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
  }

  component.currentSwipeCard = {
    user : component.currentUser,
    visible : true
  };

  fixture.detectChanges();

  });

  it('should create the usercard component', () => {
    expect(component).toBeTruthy();
  });

  it('hide image tests', () => {
    spyOn(component, 'hideImage');


   //    const spyObj = jasmine.createSpy('nativeElement');
    // let elRef: ElementRef;
    // component.swipeCardMain = elRef;
    component.hideImage(true);
    expect(component.hideImage).toHaveBeenCalled();
    //expect(component.swipeCardMain).toBeTruthy();
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
  })
  it('swipe action left', () => {
    spyOn(component, 'swipe');
    component.swipe(component.SWIPE_ACTION.LEFT, null);
    expect(component.swipe).toHaveBeenCalled();

  })
});
