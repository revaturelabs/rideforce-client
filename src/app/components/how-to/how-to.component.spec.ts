import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HowToComponent } from './how-to.component';

fdescribe('HowToComponent', () => {
  let component: HowToComponent;
  // let fixture: ComponentFixture<HowToComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [HowToComponent]});
    component = TestBed.get(HowToComponent);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
