import { RegisterComponent } from '../register/register.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '@angular/common';

describe('RegisterComponent', () => {
    let component: RegisterComponent;
    let fixture: ComponentFixture<RegisterComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports:[
                AppModule
            ],
            providers: [{provide: APP_BASE_HREF, userValue: '/'}]
            
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('validateToken with invalid token', () => {
        component.validateToken();
        expect(component.office).toBeNull();
        expect(component.ur.user.office).toBeNull();
        expect(component.ur.user.batchEnd).toBeNull();
    });

    it('register a user with Cognito', () =>{
        component.ur.user.email = 'testingTeam@TT.com';
        component.ur.user.password = 'whatisabenco';
        component.ur.user.firstName = 'Ben';
        component.ur.user.lastName = 'Co';
        
        expect(component.register()).toBeTruthy();
    });

    it('select address', () => {
        component.onAddressSelect('123 test street');
        expect(component.ur.user.location).toBe('123 test street');
    });

    it('addContactInfo check', () => {
        const input = {type: 'Cell Phone', id: null, info: null };
        component.addContactInfo();

        expect(component.contactInfo).toEqual(input);
    });

});
