import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MapComponent } from './map.component';
import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';

//  x
describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      // declarations: [ MapComponent ]
      imports: [
        AppModule
        ],
      providers: [ {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await component.ngOnInit();
  });

  it('should create the map component', () => {
    expect(component).toBeTruthy();
  });

  it('Should set map types', () => {
    component.setMapType('terrain');
    expect(component.mapTypeId).toBe('terrain');
    component.setMapType('satellite');
    expect(component.mapTypeId).toBe('satellite');
    component.setMapType('roadmap');
    expect(component.mapTypeId).toBe('roadmap');
  });

  xit('should set the tracking position marker', () => {
    component.showTrackingPosition( {
      coords : {
        latitude: 23.3,
        longitude: 23.3
      }
    });

    expect(component.marker).toBeTruthy();
  });

  it('should have a user populated', () => {
    component.findMe();
    expect(component.getSelectedUser).toBeTruthy();
  });

  // it('should populate selected user with a mock user', () => {
  //   const user: User = {
  //     // id: 1,
  //     // firstName: 'John',
  //     // lastName: 'Doe',
  //     // email: 'jdoe@outlook.com',
  //     // password: '508 Pride Ave., Herndon VA, 20170',
  //     // bio: 'Temp User',
  //     // photoUrl: '****',
  //     // office: '',
  //     // batchEnd: null,
  //     // startTime: 0,
  //     // cars: [],
  //     // contactInfo: [],
  //     // active: 'INACTIVE',
  //     // role: Role.Rider
  //     id: 1,
  // firstName: "string",
  // lastName: "string",
  // email: "string",
  // password: "string",
  // photoUrl: "string",
  // bio: "string",
  // active: "string",
  // role: Role.Rider,
  // office: '',
  // startTime: 1,
  // batchEnd: null,
  // cars: [],
  // contactInfo: []
  //   }; // = new User();
  //   component.markerClicked(user);
  //   expect(component.getSelectedUser()).toBe(user);
  // });

  it('Should Return a route', async() => {
    await component.getRoute();
    setTimeout(() => {
    console.log('Getting distance in test');
    expect(component.getCurrentDistance()).toBeTruthy();
    console.log('getting route time in test');
    expect(component.getCurrentTime()).toBeTruthy();
    }, 400);
  });

  it('Should set the radius of the map', () => {
    const curRad = component.currentRadius;
    component.currentRadius = 400;
    if (component.circle) {
      console.log('Circle is present! int test');
      console.log(component.circle.radius);
    } else {
      console.log('Circle is NOT present!');
    }
    component.changeRadius();
    // setTimeout(() => {
      console.log('Testing Radious after FIRST change');
      expect(component.circle.radius).toBe(400);
      component.currentRadius = curRad;
      component.changeRadius();
      console.log('Testing radius after SECOND change');
      /* setTimeout(() =>*/ expect(component.circle.radius).toBe(5000) /*, 200)*/;
      console.log('Post Second radius test');
    // }, 200);
  });

  it('should toggle the map', () => {
    spyOn(component, 'toggleMap').and.callThrough();
    const curTog = component.isHidden;
    component.toggleMap();
    expect(component.isHidden).toBe(!curTog);
    component.toggleMap();
    expect(component.isHidden).toBe(curTog);
  });

  it('should set given coordinates as the center', () => {
    const coordObj = {
      geometry: {
        location: new google.maps.LatLng(39, -77)
      }
    };
    let div = document.createElement('div');
    component.map = new google.maps.Map(div);
    component.setCenter(coordObj);
    const marker = {
      lat: component.currentLat,
      lng: component.currentLong,
      title: 'got you!'
    };
    // expect new center to match given location
    expect(component.map.getCenter().lat()).toBe(39);
    expect(component.map.getCenter().lng()).toBe(-77);
    expect(component.placedMarkers).toContain(marker); // expect markers array to contain new marker of the center
  });
});
