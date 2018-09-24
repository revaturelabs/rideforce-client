import { Component, OnInit, ViewChild, NgZone, AfterContentInit, OnDestroy } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { MapsControllerService } from '../../services/api/maps-controller.service';
import { UserModalComponent } from '../../components/user-modal/user-modal.component';
import { Location } from './../../models/location.model';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { User } from '../../models/user.model';
// import { } from '@types/googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [
    NgbTabset
  ]
})
export class MapComponent implements OnInit, OnDestroy, AfterContentInit {

  private start = 'herndon';
  private end = 'reston';

  private dist: number;
  private time: number;

  // Dummy data
  users: any[] = [
    {
      user: {
        id: 1,
        firstName: 'kristy',
        lastName: 'Kreme',
        email: 'email@mail.com',
        address: '123',
        office: '1',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar2/large/kristy.png'
      },
      location: {
        latitude: 38.9586,
        longitude: -77.3570
      },
    },
    {
      user: {
        id: 1,
        firstName: 'Frank',
        lastName: 'frankse',
        email: 'email@mail.com',
        address: '123',
        office: '2',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar2/large/matthew.png'
      },
      location: {
        latitude: 39.9586,
        longitude: -77.3470
      }
    },
    {
      user: {
        id: 1,
        firstName: 'Jimbo',
        lastName: 'Jank',
        email: 'email@mail.com',
        address: '123',
        office: '1',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar/large/chris.jpg'
      },
      location: {
        latitude: 38.3586,
        longitude: -77.1570
      }
    }, {
      user: {
        id: 1,
        firstName: 'kristy',
        lastName: 'Kreme',
        email: 'email@mail.com',
        address: '123',
        office: '1',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar2/large/kristy.png'
      },
      location: {
        latitude: 39.9586,
        longitude: -75.3570
      }
    },
    {
      user: {
        id: 1,
        firstName: 'Frank',
        lastName: 'frankse',
        email: 'email@mail.com',
        address: '123',
        office: '2',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar2/large/matthew.png'
      },
      location: {
        latitude: 38.9486,
        longitude: -77.3210
      }
    },
    {
      user: {
        id: 1,
        firstName: 'Jimbo',
        lastName: 'Jank',
        email: 'email@mail.com',
        address: '123',
        office: '1',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar/large/chris.jpg'
      },
      location: {
        latitude: 40.9586,
        longitude: -75.3570
      }
    }, {
      user: {
        id: 1,
        firstName: 'kristy',
        lastName: 'Kreme',
        email: 'email@mail.com',
        address: '123',
        office: '1',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar2/large/kristy.png'
      },
      location: {
        latitude: 38.2586,
        longitude: -77.1570
      }
    },
    {
      user: {
        id: 1,
        firstName: 'Frank',
        lastName: 'frankse',
        email: 'email@mail.com',
        address: '123',
        office: '2',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar2/large/matthew.png'
      },
      location: {
        latitude: 36.9586,
        longitude: -77.2570
      }
    },
    {
      user: {
        id: 1,
        firstName: 'Jimbo',
        lastName: 'Jank',
        email: 'email@mail.com',
        address: '123',
        office: '1',
        batchEnd: '1',
        cars: [],
        contactInfo: [],
        active: true,
        photoUrl: 'http://semantic-ui.com/images/avatar/large/chris.jpg'
      },
      location: {
        latitude: 38.92386,
        longitude: -77.2170
      }
    }
  ];

  markers: any[] = [];
  placedMarkers: any[] = [];

  latitude: any;
  longitude: any;
  mapTypeId = 'roadmap';

  styles: any = null;

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  isTracking = false;

  currentLat: any;
  currentLong: any;
  currentRadius = 5000;

  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  marker: google.maps.Marker;

  markerTypes = [
    {
      text: 'Parking", value: "parking_lot_maps.png'
    }
    // ,
    // {
    //   text: "Library", value: "library_maps.png"
    // },
    // {
    //   text: "Information", value: "info-i_maps.png"
    // }
  ];

  // selectedMarkerType = parking_lot_maps.png;
  @ViewChild(UserModalComponent)
  private userModal: UserModalComponent;

  isHidden = false;

  myLocation: any;

  song = new Audio();

  circle: any = {
    latitude: this.currentLat,
    longitude: this.currentLong,
    radius: this.currentRadius
  };

  constructor(private mapService: MapsControllerService, private zone: NgZone) { }

  protected mapReady(map) {
    this.map = map;
  }


  ngOnInit() {
    this.getMarkers();
    this.song.src = '../../../assets/audio/GrimGrinningGhosts.mp3';
    this.song.loop = true;
    this.song.load();
  }

  ngAfterContentInit() {
    /*  const mapProp = {
       center: new google.maps.LatLng(38.9586, -77.3570),
       zoom: 15,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     };
     this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp); */
    this.findMe();
  }

  ngOnDestroy() {
    this.song.pause();
  }

  getMarkers() {
    for (let i = 0; i < this.users.length; i++) {
      const marker: any = {
        user: this.users[i],
        icon: {
          url: this.users[i].user.photoUrl,
          scaledSize: {
            width: 30,
            height: 30
          }
        },
        location: {
          latitude: this.users[i].location.latitude,
          longitude: this.users[i].location.longitude
        },
        opacity: .92
      };
      this.markers.push(marker);
    }
  }


  public getRoute() {
    this.mapService.getRoute(this.start, this.end).subscribe(
      data => {
        this.dist = data.distance;
        this.time = data.duration;
        console.log(this.dist);
        console.log(this.time);
      }
    );
  }

  setMapType(mapTypeId: string) {
    this.mapTypeId = mapTypeId;
  }

  setCenter(address) {
    this.zone.run(() => {
      // this.addr = addrObj;
      // this.addrKeys = Object.keys(addrObj);
      this.addOriginFromAddress(address);
    });

    this.map.setCenter(new google.maps.LatLng(this.currentLat, this.currentLong));
    const marker = {
      lat: this.currentLat,
      lng: this.currentLong,
      title: 'got you!'
    };
    this.circle.latitude = this.currentLat;
    this.circle.longitude = this.currentLong;

    this.placedMarkers = [];
    this.placedMarkers.push(marker);
  }

  public addOriginFromAddress(addressObject) {
    this.currentLat = addressObject.geometry.location.lat();
    this.currentLong = addressObject.geometry.location.lng();
  }

  public changeRadius() {
    setTimeout(() => {
      console.log(this.circle.radius + ' ' + this.currentRadius);
      this.circle.radius = this.currentRadius;
    },
      100);

  }

  simpleMarkerHandler() {
    alert('Simple Component\'s function...');
  }

  markerHandler(marker: google.maps.Marker) {
    alert('Marker\'s Title: ' + marker.getTitle());
  }

  markerClicked(user: any) {
    console.log('a');
    this.userModal.open(user);
  }

  changeStyle(style: string) {
    if (this.styles !== null) {
      this.styles = null;
      this.song.pause();
    } else if (this.styles === null) {
      this.song.play();
      this.styles = [{
        'featureType': 'water',
        'stylers': [{
          'color': '#000000'
        }]
      },
      {
        'featureType': 'landscape',
        'elementType': 'geometry',

        'stylers': [{
          'color': '#ffa500'
        }]
      },
      {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [{
          'color': '#39ff14'
        }]
      }

      ];
    }
  }

  showCustomMarker() {
    this.map.setCenter(new google.maps.LatLng(this.latitude, this.longitude));

    const location = new google.maps.LatLng(this.latitude, this.longitude);

    // console.log(`selected marker: ${this.selectedMarkerType}`);

    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      // icon: this.iconBase + this.selectedMarkerType,
      title: 'Got you!'
    });
  }
  toggleMap() {
    this.isHidden = !this.isHidden;
  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
        this.circle.latitude = this.currentLat;
        this.circle.longitude = this.currentLong;
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }

  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;
      navigator.geolocation.watchPosition((position) => {
        this.showTrackingPosition(position);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    /*    const location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
       this.map.panTo(location);

       if (!this.marker) {
         this.marker = new google.maps.Marker({
           position: location,
           map: this.map,
           title: 'Got you!'
         });
       } else {
         this.marker.setPosition(location);
       } */
  }

  showTrackingPosition(position) {
    console.log(`tracking postion:  ${position.coords.latitude} - ${position.coords.longitude}`);
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    const location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    } else {
      this.marker.setPosition(location);
    }
  }

}
