import { Component, OnInit, ViewChild, NgZone, AfterContentInit, OnDestroy } from '@angular/core';
import { NgbTabset, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MapsControllerService } from '../../services/api/maps-controller.service';
import { Location } from './../../models/location.model';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { User } from '../../models/user.model';
import { Link } from '../../models/link.model';
import { MatchingControllerService } from '../../services/api/matching-controller.service';
import { UserControllerService } from '../../services/api/user-controller.service';
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

  private selectedUser: User = null;

  users: any[] = [];

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


  isHidden = false;

  myLocation: any;

  song = new Audio();

  currentUser: User;

  circle: any = {
    latitude: this.currentLat,
    longitude: this.currentLong,
    radius: this.currentRadius
  };
  closeResult: string;
  constructor(private matchService: MatchingControllerService, private userService: UserControllerService,
    private mapService: MapsControllerService, private zone: NgZone) { }

  protected mapReady(map) {
    this.map = map;
  }


  ngOnInit() {
    this.song.src = 'assets/audio/GrimGrinningGhosts.mp3';
    this.song.loop = true;
    this.song.load();
    this.userService.getCurrentUser().subscribe(
      data => {
        this.currentUser = data;
        let userLinks: Link<User>[] = null;
        this.matchService.getMatchingDrivers(this.currentUser.id).subscribe(
          data2 => {
            // console.log("data2 is " + data2);
            userLinks = data2;
            for (let i = 0; i < userLinks.length; i++) {

              this.matchService.getFromLink(userLinks[i]).subscribe(
                data3 => {
                  if (!data3.photoUrl || data3.photoUrl === 'null') {
                    data3.photoUrl = 'http://semantic-ui.com/images/avatar/large/chris.jpg';
                  }
                  const marker: any = {
                    user: data3,
                    icon: {
                      url: data3.photoUrl,
                      scaledSize: {
                        width: 30,
                        height: 30
                      }
                    },
                    location: {
                      latitude: 0,
                      longitude: 0
                    },
                    opacity: .92
                  };
                  this.mapService.getDistance(data3.address).subscribe(
                    data4 => {
                      marker.location.latitude = data4.lat;
                      marker.location.longitude = data4.lng;
                      this.markers.push(marker);
                    }
                  );
                  // Sets the current swipe card to the first element of the array if the array has something in it.
                }
              );
            }
          }
        );
      }
    );
  }



  ngAfterContentInit() {
    /*  const mapProp = {
       center: new google.maps.LatLng(38.9586, -77.3570),
       zoom: 15,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     };
     this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp); */
    this.findMe();
    this.getMarkers();
  }

  ngOnDestroy() {
    this.song.pause();
  }

  getMarkers() {
    console.log(this.users);
    for (const user of this.users) {
      console.log(user);
      const marker: any = {
        user: user,
        icon: {
          url: user.user.photoUrl,
          scaledSize: {
            width: 30,
            height: 30
          }
        },
        location: {
          latitude: user.location.latitude,
          longitude: user.location.longitude
        },
        opacity: .92
      };

      console.log(marker);
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

  markerClicked(user: any): void {
    this.selectedUser = user;
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
