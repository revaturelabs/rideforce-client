import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountinfoComponent } from './accountinfo.component';
import { AppModule } from '../../app.module';
import { AuthService } from '../../services/auth.service';
import { UserControllerService } from '../../services/api/user-controller.service';
import { HttpHandler, HttpClient } from '@angular/common/http';

describe('AccountinfoComponent', () => {
  let component: AccountinfoComponent;
  let fixture: ComponentFixture<AccountinfoComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ AccountinfoComponent ],
  //     providers: [AuthService, UserControllerService],
  //   })
  //   .compileComponents();
  // }));

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(AccountinfoComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  // });

  beforeEach(() => {
    TestBed.configureTestingModule({providers: [HttpHandler, HttpClient, UserControllerService]});
    component = TestBed.get(UserControllerService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
