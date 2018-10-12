import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '../../node_modules/@angular/common/http/testing';
import { AppModule } from './app.module';
import {APP_BASE_HREF} from '@angular/common';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         router,AppComponent
//       ]
//     });
//   }));
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
  fixture = TestBed.createComponent(AppComponent);
  component = fixture.componentInstance;
  // auth = TestBed.get(AuthService);
  fixture.detectChanges();
});

  it('should create the app', function() {
    expect(component).toBeTruthy();
  });

  // it('should create the app', async(() => {
  //   // const fixture = TestBed.createComponent(AppComponent);
  //   const app = TestBed.get(AppComponent);
  //   expect(app).toBeTruthy();
  // }));
  it(`should have as title 'app'`, async(() => {
    // const fixture = TestBed.createComponent(AppComponent);
    // const app = fixture.debugElement.componentInstance;
    expect(component.title).toEqual('app');
  }));
  xit('should render title in a h1 tag', async(() => {
    // const fixture = TestBed.createComponent(AppComponent);
    // fixture.detectChanges();
    // fixture.elementRef;
    const compiled = fixture.elementRef.nativeElement;
    // const compiled = fixture.debugElement;
    // const h1Element = compiled.queryAllNodes();
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to RideShare!');
  }));
});
