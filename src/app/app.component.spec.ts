import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

beforeEach(async(() => {
  TestBed.configureTestingModule({
      imports: [
        AppModule
        ],
      providers: [ {provide: APP_BASE_HREF, useValue : '/' }
      ]
  })
  .compileComponents();
}));

beforeEach(() => {
  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance;
  fixture.detectChanges();
});

  it('should create the app', function() {
    expect(component).toBeTruthy();
  });

  it('#onTap should be called with event', function() {
    spyOn(component, 'onTap').and.callThrough();

    component.onTap('tap');
    expect(component.onTap).toHaveBeenCalled();
  });
});
