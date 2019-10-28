import { browser, by, element, ExpectedConditions } from "protractor";
// import { RegisterComponent } from '../register/register.component';
// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { AppModule } from '../../app.module';
// import { APP_BASE_HREF } from '@angular/common';

// describe('RegisterComponent', () => {
//     let component: RegisterComponent;
//     let fixture: ComponentFixture<RegisterComponent>;

//     beforeEach(async(() => {
//         TestBed.configureTestingModule({
//             imports:[
//                 AppModule
//             ],
//             providers: [{provide: APP_BASE_HREF, userValue: '/'}]
            
//         })
//         .compileComponents();
//     }));

//     beforeEach(() => {
//         fixture = TestBed.createComponent(RegisterComponent);
//         component = fixture.componentInstance;
//         fixture.detectChanges();
//     });

//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });

//     it('validateToken with invalid token', () => {
//         component.validateToken();
//         expect(component.office).toBeNull();
//         expect(component.ur.user.office).toBeNull();
//         expect(component.ur.user.batchEnd).toBeNull();
//     });

//     it('register a user with Cognito', () =>{
//         component.ur.user.email = 'testingTeam@TT.com';
//         component.ur.user.password = 'whatisabenco';
//         component.ur.user.firstName = 'Ben';
//         component.ur.user.lastName = 'Co';
        
//         expect(component.register()).toBeTruthy();
//     });

//     it('select address', () => {
//         component.onAddressSelect('123 test street');
//         expect(component.ur.user.address).toBe('123 test street');
//     });

//     it('addContactInfo check', () => {
//         const input = {type: 'Cell Phone', id: null, info: null };
//         component.addContactInfo();

//         expect(component.contactInfo).toEqual(input);
//     });

// });


describe('Register Page', () => {
    beforeAll(() => {
        browser.get(browser.baseUrl);
        browser.executeScript("window.localStorage.setItem('currentUser', '')");
      });

      beforeEach(() => {
        browser.get(`${browser.baseUrl}/register`);
      });

      it('Email', ()=>{
          var emailBox = element(by.xpath('/html/body/app-root/div/app-register/div/div/div/ngb-tabset/div/div/form/div[2]/input'));
          var emailErrorMessage = element(by.xpath('/html/body/app-root/div/app-register/div/div/div/ngb-tabset/div/div/form/div[2]/div'));
          emailBox.sendKeys("test@test.com");
          browser.wait(ExpectedConditions.textToBePresentInElementValue(emailBox, "test@test.com"));
          expect(emailErrorMessage.isPresent()).toBeTruthy();
          emailBox.clear();
          browser.wait(ExpectedConditions.textToBePresentInElementValue(emailBox, ""));
          emailBox.sendKeys("test@revature.com");
          browser.wait(ExpectedConditions.textToBePresentInElementValue(emailBox, "test@revature.com"));
          expect(emailErrorMessage.isPresent()).toBeFalsy();
      });

      it('First Name', ()=> {
          var firstNameBox = element(by.xpath('/html/body/app-root/div/app-register/div/div/div/ngb-tabset/div/div/form/div[1]/div[1]/input'));
          var firstNameErrorMessage = element(by.xpath('/html/body/app-root/div/app-register/div/div/div/ngb-tabset/div/div/form/div[1]/div[1]/div'));
          firstNameBox.sendKeys("testName");
          browser.wait(ExpectedConditions.textToBePresentInElementValue(firstNameBox, "testName"));
          expect(firstNameErrorMessage.isPresent()).toBeFalsy();
          firstNameBox.clear();
          browser.wait(ExpectedConditions.textToBePresentInElementValue(firstNameBox, ""));
          firstNameBox.sendKeys("!");
          browser.wait(ExpectedConditions.textToBePresentInElementValue(firstNameBox, "!"));
          expect(firstNameErrorMessage.isPresent()).toBeTruthy();
          firstNameBox.clear();
          browser.wait(ExpectedConditions.textToBePresentInElementValue(firstNameBox, ""));
          expect(firstNameErrorMessage.isPresent()).toBeTruthy();
      });

      it('Last Name', ()=> {
        var lastNameBox = element(by.xpath('/html/body/app-root/div/app-register/div/div/div/ngb-tabset/div/div/form/div[1]/div[2]/input'));
        var lastNameErrorMessage = element(by.xpath('/html/body/app-root/div/app-register/div/div/div/ngb-tabset/div/div/form/div[1]/div[2]/div'));
        lastNameBox.sendKeys("testName");
        browser.wait(ExpectedConditions.textToBePresentInElementValue(lastNameBox, "testName"));
        expect(lastNameErrorMessage.isPresent()).toBeFalsy();
        lastNameBox.clear();
        browser.wait(ExpectedConditions.textToBePresentInElementValue(lastNameBox, ""));
        lastNameBox.sendKeys("!");
        browser.wait(ExpectedConditions.textToBePresentInElementValue(lastNameBox, "!"));
        expect(lastNameErrorMessage.isPresent()).toBeTruthy();
        lastNameBox.clear();
        browser.wait(ExpectedConditions.textToBePresentInElementValue(lastNameBox, ""));
        expect(lastNameErrorMessage.isPresent()).toBeTruthy();
    });

    it('Password Box', ()=> {
        var passwordBox = element(by.xpath('/html/body/app-root/div/app-register/div/div/div/ngb-tabset/div/div/form/div[8]/div[1]/input'));
        var passwordBoxErrorMessage = element(by.xpath('/html/body/app-root/div/app-register/div/div/div/ngb-tabset/div/div/form/div[8]/div[1]/div'));
        passwordBox.sendKeys("Password1!");
        browser.wait(ExpectedConditions.textToBePresentInElementValue(passwordBox, "Password1"));
        expect(passwordBoxErrorMessage.isPresent()).toBeFalsy();
        passwordBox.clear();
        browser.wait(ExpectedConditions.textToBePresentInElementValue(passwordBox, ""));
        passwordBox.sendKeys("!");
        browser.wait(ExpectedConditions.textToBePresentInElementValue(passwordBox, "!"));
        expect(passwordBoxErrorMessage.isPresent()).toBeTruthy();
        passwordBox.clear();
        browser.wait(ExpectedConditions.textToBePresentInElementValue(passwordBox, ""));
        expect(passwordBoxErrorMessage.isPresent()).toBeTruthy();
    });

    it('Confirm Password Box', ()=> {
        var passwordBox = element(by.xpath('/html/body/app-root/div/app-register/div/div/div/ngb-tabset/div/div/form/div[8]/div[1]/input'));
        var confirmPasswordBox = element(by.xpath('/html/body/app-root/div/app-register/div/div/div/ngb-tabset/div/div/form/div[8]/div[2]/input'));
        var ConfirmPasswordBoxErrorMessage = element(by.xpath('/html/body/app-root/div/app-register/div/div/div/ngb-tabset/div/div/form/div[8]/div[2]/div'));
        passwordBox.sendKeys("Password1!")
        confirmPasswordBox.sendKeys("Password1!");
        browser.wait(ExpectedConditions.textToBePresentInElementValue(passwordBox, "Password1!"));
        browser.wait(ExpectedConditions.textToBePresentInElementValue(confirmPasswordBox, "Password1!"));
        expect(ConfirmPasswordBoxErrorMessage.getCssValue("display")).toBe("none");
        confirmPasswordBox.clear();
        browser.wait(ExpectedConditions.textToBePresentInElementValue(confirmPasswordBox, ""));
        confirmPasswordBox.sendKeys("test");
        browser.wait(ExpectedConditions.textToBePresentInElementValue(confirmPasswordBox, "test"));
        expect(ConfirmPasswordBoxErrorMessage.getCssValue("display")).toBe("block");
        passwordBox.clear();
        confirmPasswordBox.clear();
        browser.wait(ExpectedConditions.textToBePresentInElementValue(passwordBox, ""));
        browser.wait(ExpectedConditions.textToBePresentInElementValue(confirmPasswordBox, ""));
        passwordBox.sendKeys("pass");
        confirmPasswordBox.sendKeys("pass");
        browser.wait(ExpectedConditions.textToBePresentInElementValue(passwordBox, "pass"));
        browser.wait(ExpectedConditions.textToBePresentInElementValue(confirmPasswordBox, "pass"));
        expect(ConfirmPasswordBoxErrorMessage.getCssValue("display")).toBe("block");
    });

      afterEach(() => {
        browser.executeScript("window.localStorage.setItem('currentUser', '')");
      });
});