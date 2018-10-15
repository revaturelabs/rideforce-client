import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminComponent } from './admin.component';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { UserControllerService } from '../../services/api/user-controller.service';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { NgbModule } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({       
      imports: [
      AppModule
      ],
    providers: [ {provide: APP_BASE_HREF, useValue : '/' }
    ]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  // beforeEach(() => {
  //   TestBed.configureTestingModule({providers: [HttpHandler, HttpClient, UserControllerService, AdminComponent]});
  //   component = TestBed.get(AdminComponent);
  // });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
