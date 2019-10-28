import { browser, element, by, ExpectedConditions } from "protractor";

// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { AppModule } from '../../app.module';
// import { NavbarComponent } from './navbar.component';
// import { AuthService } from '../../services/auth.service';

// import {APP_BASE_HREF} from '@angular/common';

// describe('NavbarComponent', () => {
//   let component: NavbarComponent;
//   let fixture: ComponentFixture<NavbarComponent>;
//   let auth: AuthService;
//   //const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//         // declarations: [ LoginComponent ],
//         imports: [
//           AppModule
//           ],
//         providers: [ {provide: APP_BASE_HREF, useValue : '/' }
//         ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(NavbarComponent);
//     component = fixture.componentInstance;
//     //auth = TestBed.get(AuthService);
//     fixture.detectChanges();
//   });

//   it('should create the navbar component', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should log out (probably does anyway)!', () => {
//     console.log('logout test');
//     component.logout();
//     component.sessionCheck();
//     expect(component.session).toBeFalsy();
//   });

//   xit('should log in successfully', async () => {
//     console.log('login test');
//     // NgZone.run();
//     await auth.authenticate('admin@revature.com', 'P@ssw0rd', true);
//     component.sessionCheck();
//     expect(component.session).toBeTruthy();
//     component.logout(); 
//     component.sessionCheck();
//     expect(component.session).toBeFalsy();
//   });

//   // basic dropdown test
//   it ('should toggle dropdown successfully', () => {
//     component.drop();
//     expect(component.dropped).toBeTruthy();
//   });

//   it('should handle the if condition in drop', () => {
//     component.dropped = true;
//     component.drop();
//     expect(component.dropped).toBeTruthy();
//   });

//   it('sessionCheck values', () => {
//     component.principal.id = 1;
//     component.sessionCheck();
//     expect(component.session).toBeTruthy();

//     component.principal.id = 0;
//     component.sessionCheck();
//     expect(component.session).toBeFalsy();
//   });

//   it('test the installation of PWA', () => {
//     component.deferredInstall = 1;
//     expect(component.install()).toBeTruthy();
//   });
// });


describe('Nav Bar Logged Out', () => {
  beforeAll(() => {
    browser.get(browser.baseUrl);
    browser.executeScript("window.localStorage.setItem('currentUser', '')");
    browser.get(browser.baseUrl);
  })
  
  it('Click Home Button', () => {
    element(by.xpath('/html/body/app-root/app-navbar/nav/div[1]/div/a[1]')).click();
    expect(browser.getCurrentUrl()).toBe(`${browser.baseUrl}/landing`);
  });

  it('Click Login Button', () => {
    element(by.xpath('/html/body/app-root/app-navbar/nav/div[1]/div/a[2]')).click();
    expect(browser.getCurrentUrl()).toBe(`${browser.baseUrl}/login`);
  });

  afterEach(() => {
    browser.executeScript("window.localStorage.setItem('currentUser', '')");
  })
});

describe('Nav Bar Logged In', () =>{
  beforeAll(() => {
    browser.get(browser.baseUrl);
    browser.executeScript("window.localStorage.setItem('currentUser', '')");
    browser.get(`${browser.baseUrl}/login`);
    var login = element(by.xpath("/html/body/app-root/div/app-login/div[2]/div/div[2]/form/input[1]"));
    var password =element(by.xpath("/html/body/app-root/div/app-login/div[2]/div/div[2]/form/input[2]"));
    var loginButton = element(by.xpath('/html/body/app-root/div/app-login/div[2]/div/div[2]/form/input[3]'));
    browser.wait(ExpectedConditions.elementToBeClickable(login));

    login.sendKeys("timsemail1@revature.com");
    browser.wait(ExpectedConditions.elementToBeClickable(password));
    password.sendKeys("pass");
    browser.wait(ExpectedConditions.textToBePresentInElementValue(login, "timsemail1@revature.com"));
    browser.wait(ExpectedConditions.textToBePresentInElementValue(password, "pass"));
    browser.wait(ExpectedConditions.elementToBeClickable(loginButton));
    loginButton.click();

    browser.wait(ExpectedConditions.urlIs(`${browser.baseUrl}/landing`));
  });

  it('Click Browse', () => {
    var browseButton = element(by.xpath('/html/body/app-root/app-navbar/nav/div[1]/div/a[2]'));
    browser.wait(ExpectedConditions.elementToBeClickable(browseButton));
    browseButton.click();
    expect(browser.getCurrentUrl()).toBe(`${browser.baseUrl}/viewUsers`);
  });

  // Revisit, doesn't work for some reason 
  //
  // it('Click Profile', () => {
  //   var profileButton = element(by.xpath('/html/body/app-root/app-navbar/nav/div[1]/div/a[3]'));
  //   browser.wait(ExpectedConditions.elementToBeClickable(profileButton));
  //   profileButton.click();
  //   expect(browser.getCurrentUrl()).toBe(`${browser.baseUrl}/userProfile`);
  // });
  //
  // it('Click Logout', () => {
  //   var logoutButton = element(by.xpath('/html/body/app-root/app-navbar/nav/button[2]'));
  //   browser.wait(ExpectedConditions.elementToBeClickable(logoutButton));
  //   logoutButton.click();
  //   expect(browser.getCurrentUrl()).toBe(`${browser.baseUrl}/landing`);
  // })

  afterEach(() => {
    //browser.sleep(20000);
  });

  afterAll(() => {
    browser.executeScript("window.localStorage.setItem('currentUser', '')");
  });
});



