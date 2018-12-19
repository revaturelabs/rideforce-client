import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { UserControllerService } from '../../services/api/user-controller.service';
import { MatchingControllerService } from '../../services/api/matching-controller.service';
import { ElementRef } from '@angular/core';

import { UsercardComponent } from './usercard.component';
import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';

describe('UsercardComponent', () => {
  let component: UsercardComponent;
  let fixture: ComponentFixture<UsercardComponent>;

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
        imports: [
          AppModule
          ],
        providers: [
          {provide: APP_BASE_HREF, useValue : '/' ,
          UsercardComponent}
        ]
    })
    .compileComponents();
  }));

     beforeEach(() => {
    fixture = TestBed.createComponent(UsercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

     beforeEach(() => {
    fixture = TestBed.createComponent(UsercardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hide image tests', () => {
    const spyObj = jasmine.createSpy('nativeElement');
    // let elRef: ElementRef;
    // component.swipeCardMain = elRef;
    component.hideImage(true);
    //expect(component.swipeCardMain).toBeTruthy();
  });
  it('unhide image tests', () => {
    component.hideImage(false);
  });
  it('swipe action right',() => {
    component.swipe(component.SWIPE_ACTION.RIGHT,null);
  })
  it('swipe action left',() => {
  component.swipe(component.SWIPE_ACTION.LEFT,null);
  })
});
