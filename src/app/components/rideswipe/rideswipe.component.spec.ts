import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RideswipeComponent } from './rideswipe.component';

describe('RideswipeComponent', () => {
  let component: RideswipeComponent;
  // let fixture: ComponentFixture<RideswipeComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ RideswipeComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(RideswipeComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [RideswipeComponent]});
    component = TestBed.get(RideswipeComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
