import { HttpHandler, HttpClient } from '@angular/common/http';
import { DebugElement, ElementRef } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { UsercardComponent } from './usercard.component';
import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';
import { Role } from '../../models/role.model';
import { SwipecardModel } from '../../models/swipecard.model';
import { User } from '../../models/user.model';
import { UserControllerService } from '../../services/api/user-controller.service';
import { MatchingControllerService } from '../../services/api/matching-controller.service';
import { from } from 'rxjs';

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


  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ UsercardComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   TestBed.configureTestingModule({providers: [HttpHandler, HttpClient, MatchingControllerService,
  //      UserControllerService, UsercardComponent]});
  //   component = TestBed.get(UsercardComponent);
  // });

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
