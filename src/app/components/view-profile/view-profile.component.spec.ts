import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { UserControllerService } from '../../services/api/user-controller.service';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

import { ViewProfileComponent } from './view-profile.component';

describe('ViewProfileComponent', () => {
  let component: ViewProfileComponent;
  // let fixture: ComponentFixture<ViewProfileComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ ViewProfileComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(ViewProfileComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [HttpHandler, HttpClient, DateFormatPipe,
       UserControllerService, ViewProfileComponent]});
    component = TestBed.get(ViewProfileComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
