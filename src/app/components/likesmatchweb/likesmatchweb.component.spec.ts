import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesmatchwebComponent } from './likesmatchweb.component';

describe('LikesmatchwebComponent', () => {
  let component: LikesmatchwebComponent;
  let fixture: ComponentFixture<LikesmatchwebComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LikesmatchwebComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesmatchwebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
