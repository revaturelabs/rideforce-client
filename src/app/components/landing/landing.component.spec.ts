import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { UserControllerService } from '../../services/api/user-controller.service';

describe('LandingComponent', async() => {
  let component: LandingComponent;
  // let fixture: ComponentFixture<LandingComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ LandingComponent ],
  //     providers: [HttpHandler, HttpClient, UserControllerService, LandingComponent]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(LandingComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [HttpHandler, HttpClient, UserControllerService, LandingComponent]});
    component = TestBed.get(LandingComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
