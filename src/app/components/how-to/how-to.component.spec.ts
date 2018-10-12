import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToComponent } from './how-to.component';

describe('HowToComponent', () => {
  let component: HowToComponent;
  // let fixture: ComponentFixture<HowToComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ HowToComponent ]
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(HowToComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });
  beforeEach(() => {
    TestBed.configureTestingModule({providers: [HowToComponent]});
    component = TestBed.get(HowToComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
