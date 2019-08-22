import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingComponent } from './landing.component';
import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';

describe('LandingComponent', async() => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          AppModule
          ],
        providers: [
          {provide: APP_BASE_HREF, useValue : '/',
          LandingComponent}
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
