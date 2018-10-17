/// <reference path="../../../../node_modules/@types/googlemaps/index.d.ts" />
import { Component, OnInit, ViewChild, NgZone, AfterContentInit, OnDestroy } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { MapsControllerService } from '../../services/api/maps-controller.service';
import { User } from '../../models/user.model';
import { Link } from '../../models/link.model';
import { MatchingControllerService } from '../../services/api/matching-controller.service';
import { UserControllerService } from '../../services/api/user-controller.service';
import { Router } from '@angular/router';

/**
 * Component that handles route navigation and displays a map
 */
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [
    NgbTabset
  ]
})
export class MapComponent implements OnInit, OnDestroy, AfterContentInit {

  /** Where Users reside */
  private start = 'herndon';
  /** Where Users work */
  private end = 'reston';

  /** Distance of the route */
  private dist: number;
  /** Estimated time of the drive */
  private time: number;

  /** Holds the currently selected user */
  private selectedUser: User = null;



  /** Holds list of possible drivers to present */
  users: any[] = [];

  /** Holds list of markers on map representing Users */
  markers: any[] = [];
  placedMarkers: any[] = [];

  /** placeholder for the latitude value */
  latitude: any;
  /** placeholder for the longitude value */
  longitude: any;
  /** Represents the type of map being shown */
  mapTypeId = 'roadmap';

  styles: any = null;

  /** Represents an element labeled 'gmap' (currently not used) */
  @ViewChild('gmap') gmapElement: any;

  /** Holds the map in the compnent */
  map: google.maps.Map;

  isTracking = false;

  /** Current Latitude, set by the Mapping control */
  currentLat: any;
  /** Current Longitude, set by the Mapping Control */
  currentLong: any;
  /** Current radious, set by a number control */
  currentRadius = 5000;

  /** Stores list of users favorited locations */
  favoriteLocations: string[];

  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';

  /**
   * Holds a current map marker that could appear on a Google map
   */
  marker: google.maps.Marker;

  /**
   * represents the types of markers that could appear
   */
  markerTypes = [
    {
      text: 'Parking', value: 'parking_lot_maps.png'
    }

  ];

  /** Whether the map is hidden or not */
  isHidden = false;

  /**
   * Likely intended to represent the location of the current user.
   * Could be deprecated
   */
  myLocation: any;

  /** Represents a song that is playing in the background */
  song = new Audio();

  /** Holds the User that's logged in */
  currentUser: User;

  /** Sets the range to search */
  circle: any = {
    latitude: this.currentLat,
    longitude: this.currentLong,
    radius: this.currentRadius
  };

  /**
   * @ignore
   */
  closeResult: string;

  /** Stores the value of our text box locally*/
  selectedLocation: string;

  /**
   * Sets up the map component with dependency injection
   * @param {MatchingControllerService} matchService - Allows management between riders and drivers
   * @param {UserControllerService} userService - Allows management of the Users
   * @param {MapsControllerService} mapService - Allows a map to be managed
   * @param {NgZone} zone - Provides location services
   * @param {Router} route - Allows Nav compnent to switch between sub-components
   */
  constructor(
    private matchService: MatchingControllerService, 
    private userService: UserControllerService,
    private mapService: MapsControllerService, 
    private zone: NgZone,
    private route: Router
    ) { }

  /**
   * Retireves the distance of the current route (set by setRoute)
   * @returns {number} - the distance of the route
   */
  getCurrentDistance(): number {
    return this.dist;
  }

  /**
   * Retireves the estimated time of the current route (set by setRoute)
   * @returns {number} - the estimated time of the route
   */
  getCurrentTime(): number {
    return this.time;
  }

  /**
   * Sets up the Map
   * @param {GoogleMap.maps.Map} map - the Google Map to set
   */
  protected mapReady(map) {
    this.map = map;
  }

  /**
   * retrieves the selected user
   * @returns {User} - the user currently selected
   */
  getSelectedUser(): User {
    return this.selectedUser;
  }

  /**
   * Initializes the Map with data
   */
  ngOnInit() {
    if (sessionStorage.length == 0)
      this.route.navigate(["/landing"]);
    this.song.src = 'assets/audio/GrimGrinningGhosts.mp3';
    this.song.loop = true;
    this.song.load();
    this.userService.getCurrentUser().subscribe(
      data => {
        this.currentUser = data;
        console.log('User data from current user (Service) called by Map component');
        console.log(data);
        let userLinks: Link<User>[] = null;
        this.matchService.getMatchingDrivers(this.currentUser.id).subscribe(
          data2 => {
            // console.log("data2 is " + data2);
            userLinks = data2;
            for (let i = 0; i < userLinks.length; i++) {

              this.matchService.getFromLink(userLinks[i]).subscribe(
                data3 => {
                  console.log('printing user link: ' + i);
                  console.log(data3);
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
                    },
                    e => {
                      console.log('error getting distance!');
                      console.log(e);
                    }
                  );
                  // Sets the current swipe card to the first element of the array if the array has something in it.
                },
                e => {
                  console.log('error getting match user (Map component)!');
                  console.log(e);
                }
              );
            }
          },
          e => {
            console.log('error getting match drivers (Map Component)!');
            console.log(e);
         }
        );
      },
      e => {
        console.log('error getting current user (Map Component)!');
        console.log(e);
      }
    );
    this.findMe();
  }



  /**
   * Final initialization after the content is set up
   */
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

  /**
   * Stops any song playing once the component is being terminated
   */
  ngOnDestroy() {
    this.song.pause();
  }

  /**
   * Sets up markers of Drivers on the map
   */
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

  /**
   * Get the metadata (distance, estimated duration) of a given route
   */
  public getRoute() {
    this.mapService.getRoute(this.start, this.end).subscribe(
      data => {
        this.dist = data.distance;
        this.time = data.duration;
        console.log('printing route information...');
        console.log(this.dist);
        console.log(this.time);
      }
    );
  }

  /**
   * Sets the map to a new style
   * @param {string} mapTypeId - the new type to set the map as
   */
  setMapType(mapTypeId: string) {
    this.mapTypeId = mapTypeId;
  }

  /**
   * Sets the map center to a specific location
   * @param address - the location to zoom in on
   */
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

  /**
   * Sets the specific location on a map
   * @param addressObject - the address to look at
   */
  public addOriginFromAddress(addressObject) {
    this.currentLat = addressObject.geometry.location.lat();
    this.currentLong = addressObject.geometry.location.lng();
  }

  /** Changes the radius of your search */
  public changeRadius() {
    // setTimeout(() => {
      console.log(this.circle.radius + ' ' + this.currentRadius);
      this.circle.radius = this.currentRadius;
    // },
    //   100);

  }

  /**
   * (Does not appear to be used)
   */
  simpleMarkerHandler() {
    alert('Simple Component\'s function...');
  }

  /**
   * Displays the title of a given marker (does not appear to be used)
   * @param marker - the marker to display
   */
  markerHandler(marker: google.maps.Marker) {
    alert('Marker\'s Title: ' + marker.getTitle());
  }

  /**
   * Sets the selected user to whatever user was just selected
   * @param user - the user to select
   */
  markerClicked(user: any): void {
    this.selectedUser = user;
  }

  /**
   * Sets the component style
   * @param style - the style to set the component to
   */
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

  /**
   * Shows the location you are at
   * (incomplete)
   */
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
    this.markers.push(marker);
  }

  /** Toggles whether or not the map is hidden */
  toggleMap() {
    this.isHidden = !this.isHidden;
  }

  /**
   * Attempts to determne the location of the current user and zoom in on it
   */
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

  /**
   * Attempts to determne the location of the current user and mark that location
   */
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

  /**
   * Zooms the map onto the location of the user
   * @param position - the position of the user
   */
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

  /**
   * Adds a marker onto the location of the user
   * @param position - the location of the user
   */
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

  /** 
   * Makes a request to update the user's favorite locations table  
  */
  saveLocation(){
    //TODO: Make a request to update the locations list 
    console.log((document.getElementById("currentLocation") as HTMLInputElement).value);
  }

  /** Retrieves the current list of user's favorite locations*/
  getLocations(){
    //TODO: Load locations into our local locations object  
    
  }
}
