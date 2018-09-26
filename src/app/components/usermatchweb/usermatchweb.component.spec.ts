import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsermatchwebComponent } from './usermatchweb.component';

describe('UsermatchwebComponent', () => {
  let component: UsermatchwebComponent;
  let fixture: ComponentFixture<UsermatchwebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsermatchwebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsermatchwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
