import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../../app.module';
import { NavbarComponent } from './navbar.component';
import { AuthService } from '../../services/auth.service';

import {APP_BASE_HREF} from '@angular/common';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let auth: AuthService;
  //const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        // declarations: [ LoginComponent ],
        imports: [
          AppModule
          ],
        providers: [ {provide: APP_BASE_HREF, useValue : '/' }
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    //auth = TestBed.get(AuthService);
    fixture.detectChanges();
  });

  it('should create the navbar component', () => {
    expect(component).toBeTruthy();
  });

  it('should log out (probably does anyway)!', () => {
    console.log('logout test');
    component.logout();
    component.sessionCheck();
    expect(component.session).toBeFalsy();
  });

  xit('should log in successfully', async () => {
    console.log('login test');
    // NgZone.run();
    await auth.authenticate('admin@revature.com', 'P@ssw0rd', true);
    component.sessionCheck();
    expect(component.session).toBeTruthy();
    component.logout(); 
    component.sessionCheck();
    expect(component.session).toBeFalsy();
  });

  // basic dropdown test
  it ('should toggle dropdown successfully', () => {
    component.drop();
    expect(component.dropped).toBeTruthy();
  });

  it('should handle the if condition in drop', () => {
    component.dropped = true;
    component.drop();
    expect(component.dropped).toBeTruthy();
  });

  it('sessionCheck values', () => {
    component.principal.id = 1;
    component.sessionCheck();
    expect(component.session).toBeTruthy();

    component.principal.id = 0;
    component.sessionCheck();
    expect(component.session).toBeFalsy();
  });

  it('test the installation of PWA', () => {
    component.deferredInstall = 1;
    expect(component.install()).toBeTruthy();
  });
});
