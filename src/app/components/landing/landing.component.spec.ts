import { browser, by, element } from "protractor";


// // import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { LandingComponent } from './landing.component';
// import { HttpHandler, HttpClient } from '@angular/common/http';
// import { AppModule } from '../../app.module';
// import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';
// import { async } from '@angular/core/testing';
// import { ComponentFixture } from '@angular/core/testing';
// import { TestBed } from '@angular/core/testing';

// describe('LandingComponent', async() => {
//   let component: LandingComponent;
//   let fixture: ComponentFixture<LandingComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//         imports: [
//           AppModule
//           ],
//         providers: [
//           {provide: APP_BASE_HREF, useValue : '/',
//           LandingComponent}
//         ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LandingComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });


describe('Landing page', () => {
  beforeAll(() => {
    browser.get(browser.baseUrl);
    browser.executeScript("window.localStorage.setItem('currentUser', '')");
  });
  
  beforeEach(() => {
    browser.get(`${browser.baseUrl}/landing`);
  });

  it('Click Get Started Button Logged Out', () => {

    element(by.xpath('/html/body/app-root/div/app-landing/div[2]/div[1]/a')).click();

    expect(browser.getCurrentUrl()).toBe(`${browser.baseUrl}/login`);

  });

  it('Click click here Button', () => {

    element(by.xpath('/html/body/app-root/div/app-landing/div[2]/div[1]/div/a')).click();

    expect(browser.getCurrentUrl()).toBe(`${browser.baseUrl}/howTo`);

  })

  afterEach(() => {
    browser.executeScript("window.localStorage.setItem('currentUser', '')");
  })
});

