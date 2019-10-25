import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseDriverComponent } from './browse-driver.component';

describe('BrowseDriverComponent', () => {
  let component: BrowseDriverComponent;
  let fixture: ComponentFixture<BrowseDriverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseDriverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
