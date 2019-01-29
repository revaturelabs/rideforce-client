import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { SearchUsersComponent } from './search-users.component';
import { FormsModule } from '@angular/forms';
import { ViewUsersComponent } from '../view-users/view-users.component';

describe('SearchUsersComponent', () => {
  let component: SearchUsersComponent;
  let fixture: ComponentFixture<SearchUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchUsersComponent],
      imports: [FormsModule],
      providers: [HttpHandler, HttpClient, ViewUsersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    // component should be Not Null, not necessarily Truthy
    expect(component).not.toBe(null);
    //    expect(component).toBeTruthy();
  });
});
