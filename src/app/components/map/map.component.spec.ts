import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { AppModule } from '../../app.module';
import { APP_BASE_HREF } from '../../../../node_modules/@angular/common';
import { UsercardComponent } from '../usercard/usercard.component';
import { User } from '../../models/user.model';
import { Role } from '../../models/role.model';

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

  // beforeEach(() => {
  //   fixture = TestBed.createComponent(MapComponent);
  //   component = fixture.componentInstance;
  //   fixture.detectChanges();
  //   component.ngOnInit();
  // });

  it('should create', () => {
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
    expect(component.currentUser).toBeTruthy();
  });

  it('should populate selected user with a mock user', () => {
    const user: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'jdoe@outlook.com',
      address: '508 Pride Ave., Herndon VA, 20170',
      bio: 'Temp User',
      password: '****',
      photoUrl: '****',
      office: '',
      batchEnd: null,
      cars: [],
      contactInfo: [],
      active: 'INACTIVE',
      role: Role.Rider
    }; // = new User();
    component.markerClicked(user);
    expect(component.getSelectedUser()).toBe(user);
  });
});
