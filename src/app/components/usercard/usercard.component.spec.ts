import { HttpHandler, HttpClient } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UsercardComponent } from './usercard.component';
import { AppModule } from '../../app.module';
import { UserControllerService } from '../../services/api/user-controller.service';
import { MatchingControllerService } from '../../services/api/matching-controller.service';

describe('UsercardComponent', () => {
  let component: UsercardComponent;
  let fixture: ComponentFixture<UsercardComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('hide image tests', () => {
    fixture.detectChanges();

    component.hideImage(true);
  });
  // this never worked ?
  xit('unhide image tests', () => {
    component.hideImage(false);
  });
  it('swipe action right', () => {
    component.swipe(component.SWIPE_ACTION.RIGHT, null);
  });
  it('swipe action left', () => {
    component.swipe(component.SWIPE_ACTION.LEFT, null);
  });

  it('run ngOnInit', () => {
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('check first values', () => {
    expect(component).toBeTruthy();
    expect(component.currentIndex).toBe(0);
    expect(component.animState).toBe('center');
    expect(component.animThumbState).toBe('one');
    expect(component.thumbImg).toBe('assets/icons/thumbsDown.png');
    
  });
  
  xit('get current user', () => {
    component.ngOnInit();
    expect(component.currentUser).toBeTruthy();
  });

  it('thumbAnimDone', () => {
    component.animThumbState = 'two';
    component.thumbAnimDone();

    expect(component.animThumbState).toBe('one');
  });
});
