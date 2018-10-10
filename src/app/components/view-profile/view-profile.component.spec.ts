import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHandler, HttpClient } from '@angular/common/http';
import { UserControllerService } from '../../services/api/user-controller.service';
// import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { By } from '@angular/platform-browser';

import { ViewProfileComponent } from './view-profile.component';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { NgbModule } from '../../../../node_modules/@ng-bootstrap/ng-bootstrap';

describe('ViewProfileComponent', () => {
  let component: ViewProfileComponent;
  let fixture: ComponentFixture<ViewProfileComponent>;

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //     declarations: [ ViewProfileComponent ]
  //   })
  //   .compileComponents();
  // }));

  //Got rid of DateFormatPipe from providers to make code work.
  beforeEach(async(() => {
    TestBed.configureTestingModule({providers: [HttpHandler, HttpClient, 
       UserControllerService, ViewProfileComponent],
      declarations:[ViewProfileComponent],
    imports:[FormsModule, NgbModule]}).compileComponents();
    // component = TestBed.get(ViewProfileComponent);
  }));

  // beforeEach(async(() => {
  //   TestBed.configureTestingModule({
  //       //declarations: [ LoginComponent ],
  //       imports: [
  //         AppModule
  //         ],
  //       providers:[
  //         {provide: APP_BASE_HREF, useValue : '/' }
  //       ]
  //   })
  //   .compileComponents();
  // }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should make profile editable', () => {
    component.edit();
    const inputUser: HTMLInputElement = fixture.nativeElement.querySelector("#firstName");
    const e: Event = document.createEvent("Event");
    e.initEvent("input", false, false);
    // inputUser.value = "Bob";
    // inputUser.dispatchEvent(e);
    // fixture.detectChanges();
    // console.log(fixture.debugElement.query(By.css('#firstName')).nativeElement.innerText);
  })
});
