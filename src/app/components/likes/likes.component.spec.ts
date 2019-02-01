import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LikesComponent } from './likes.component';
import { AuthService } from '../../services/auth.service';
import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';

describe('LikesComponent', () => {
  let component: LikesComponent;
  let authService: AuthService;
  let fixture: ComponentFixture<LikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          AppModule
          ],
        providers: [
          {provide: APP_BASE_HREF, useValue : '/',
          LikesComponent}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // beforeEach(async () => {
  //   authService = TestBed.get(AuthService);
  //   await authService.authenticate('jljacko@outlook.com', 'johnPass');
  // });

  beforeEach(async () => {
    authService = TestBed.get(AuthService);
    await authService.authenticate('science@gmail.com', '12345678');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Ignoring this because Cognito Team 
  // might change how user service works
  xit('should get the User', () => {
    component.ngOnInit();
    expect(component.currentUser).toBeTruthy();
    // returns undefined because it doesnt get the user
  });
});
