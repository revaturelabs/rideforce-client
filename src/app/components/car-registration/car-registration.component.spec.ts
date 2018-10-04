import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarRegistrationComponent } from './car-registration.component';

describe('CarRegistrationComponent', () => {
  let component: CarRegistrationComponent;
  let fixture: ComponentFixture<CarRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
