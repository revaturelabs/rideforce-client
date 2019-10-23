/// <reference path="../../../../node_modules/@types/googlemaps/index.d.ts" />
import { Component, OnInit, ViewChild, NgZone, AfterContentInit, OnDestroy } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
// import { MapsControllerService } from '../../services/api/maps-controller.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Link } from '../../models/link.model';
// import { MatchingControllerService } from '../../services/api/matching-controller.service';
// import { UserControllerService } from '../../services/api/user-controller.service';
import { Router } from '@angular/router';
import { Location } from '../../models/location.model';
import { bool } from 'aws-sdk/clients/signer';
// import { AuthService } from '../../services/auth.service'
import { Login } from '../../models/login.model';
import { environment } from '../../../environments/environment';

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
  public selectedUser: User = null;// made public so it can build. was private



  /** Holds list of possible drivers to present */
  users: any[] = [];

  /** Holds list of markers on map representing Users */
  markers: any[] = [];
  placedMarkers: any[] = [];
  labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  labelIndex = 0;
  /** placeholder for the latitude value */
  latitude: any;
  /** placeholder for the longitude value */
  longitude: any;
  /** Represents the type of map being shown */
  mapTypeId = 'roadmap';
  /** The label on the button located in corner of the map */
  buttonLabel: string;
  /** User role to be used in map popup */
  userRole: string;


  //Styles
  styles: any = null;
  halloweenStyle: any = null;
  christmasStyle: any = null;

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
  showingUser: boolean = false;
  /** Stores list of users favorited locations */
  favoriteLocations: any[] = [];

  showFavorites: boolean = true;

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

  /** Automatically set map bounds based on total markers */
  fitBounds = false;

  /**
   * Likely intended to represent the location of the current user.
   * Could be deprecated
   */
  myLocation: any;

  /** Represents a song that is playing in the background */
  hsong = new Audio();
  csong = new Audio();

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

  /**Store name of saved location into textbox locally **/
  favoriteName: string;

  /**Store name location to delete into textbox locally **/
  deleteFavorite: string;

  principal: User;

  /**
   * Sets up the map component with dependency injection
   * @param {MatchingControllerService} matchService - Allows management between riders and drivers
   * @param {UserControllerService} userService - Allows management of the Users
   * @param {MapsControllerService} mapService - Allows a map to be managed
   * @param {NgZone} zone - Provides location services
   * @param {Router} route - Allows Nav compnent to switch between sub-components
   */
  constructor(
    // private matchService: MatchingControllerService,
    // private userService: UserControllerService,
    // private mapService: MapsControllerService,
    // private auth: AuthService,
    private zone: NgZone,
    private route: Router,
    private http: HttpClient
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
  // protected mapReady(map) {
  //   this.map = map;
  // }

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

  addresses: string[] = ["9416 wooded glen avenue", "1099 godfrey road", "11740 Plaza America Dr", "829 East Sage Road"];




  ngOnInit() {
    // this.auth.principal.subscribe(p => {
    //   this.principal = p;
    //   if (this.principal.id > 0) {
    //     console.log("Location: " + JSON.stringify(this.principal.location));
    //     this.lat = this.principal.location.latitude;
    //     this.lng = this.principal.location.longitude;
    //     if (this.principal.role == "RIDER") {
    //       this.buttonLabel = "Drivers Near Me";
    //       this.userRole = "Driver";
    //     }
    //     else if (this.principal.role == "DRIVER") {
    //       this.userRole = "Rider";
    //       this.buttonLabel = "Riders Near Me";
    //     }
    //   }
    // });
  }

  /**
   * Final initialization after the content is set up
   */
  ngAfterContentInit() {

  }

  /**
   * Stops any song playing once the component is being terminated
   */
  ngOnDestroy() {
    this.hsong.pause();
    this.csong.pause();
  }

  initMap(latitude, longitude) {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: latitude, lng: longitude },
      zoom: 8
    });
  }

  labelOptions = {

    color: 'blue',

    fontFamily: '',

    fontSize: '14px',

    fontWeight: 'bold',

    text: 'You Are Here!',

  }

  customMap: any;
  mapReady(event: any) {
    this.customMap = event;
    this.customMap.controls[google.maps.ControlPosition.TOP_LEFT].push(document.getElementById('festivals'));
  }

  events: User[];
  lat: any;
  lng: any;
  ll: any;
  lg: any;

  festivalClicked() {
    console.log('clicked');
    this.getEvents();
  }

  getEvents() {
    console.log(this.principal);
    this.fitBounds = true;
    if (this.principal.role == "RIDER") {
      this.getNearestDrivers();
    }
    else if (this.principal.role == "DRIVER")
      this.getNearestRiders();
  }

  getNearestDrivers() {
    // this.matchService.getMatchingDrivers(this.principal.id).subscribe(
    //   drivers => {
    //     this.events = drivers;
    //   }
    // );
  }

  getNearestRiders() {
    console.log("I am a DRIVER!");
    let officeId: number = parseInt(this.principal.office.substring(9));
    // this.userService.getUserByOfficeAndRole(officeId, "RIDER").subscribe(
    //   riders => {
    //     this.events = riders;
    //   }
    // );
  }


  /**
   * Sets up markers of Drivers on the map
   * Does not appear to serve a purpose this may be removable?
   */
  getMarkers() {
    for (const driver of this.events) {
      const marker: any = {
        user: driver,
        icon: {
          url: driver.photoUrl,
          scaledSize: {
            width: 30,
            height: 30
          }
        },
        location: {
          latitude: driver.location.latitude,
          longitude: driver.location.longitude
        },
        opacity: .92
      };
      const newLocation = new google.maps.LatLng(marker.location.latitude, marker.location.longitude);
    }
  }

  /**
   * Get the metadata (distance, estimated duration) of a given route
   */
  public getRoute() {
    // this.mapService.getRoute(this.start, this.end).subscribe(
    //   data => {
    //     this.dist = data.distance;
    //     this.time = data.duration;
    //     console.log('printing route information...');
    //     console.log(this.dist);
    //     console.log(this.time);
    //   }
    // );
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
    this.fitBounds = true;
    console.log("setCenter");
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
  //Halloween overlay for maps
  halloween() {
    if (this.halloweenStyle !== null) {
      this.halloweenStyle = null;
      this.hsong.pause();
    } else if (this.halloweenStyle === null) {
      this.hsong.play();
      this.csong.pause();
      this.christmasStyle = null;
      this.halloweenStyle = [{
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

  //Christmas overlay for Map
  christmas() {
    if (this.christmasStyle !== null) {
      this.christmasStyle = null;
      this.csong.pause();
    } else if (this.christmasStyle === null) {
      this.csong.play();
      this.hsong.pause();
      this.halloweenStyle = null;
      this.christmasStyle = [{
        'featureType': 'water',
        'stylers': [{
          'color': '#5897fc'
        }]
      },
      {
        'featureType': 'landscape',
        'elementType': 'geometry',

        'stylers': [{
          'color': '#dbffdb'
        }]
      },
      {
        'featureType': 'poi',
        'elementType': 'geometry',
        'stylers': [{
          'color': '##ffd8e1'
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

    this.map.setCenter(new google.maps.LatLng(this.currentLat, this.currentLong));

    const location = new google.maps.LatLng(this.currentLat, this.currentLong);

    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      // icon: this.iconBase + this.selectedMarkerType,
      label: this.labels[this.labelIndex++ % this.labels.length],
      title: 'Got you!'
    });
    this.markers.push(marker);
    //adds Marker for the current user
    this.showingUser = true;
  }

  /*
    addDriverMarkers
    Renders location of a drivers provided a location
  */
  addDriverMarkers(newLocation: Location) {
    const location = new google.maps.LatLng(newLocation.latitude, newLocation.longitude);
    const marker = new google.maps.Marker({
      position: location,
      map: this.map,
      // icon: this.iconBase + this.selectedMarkerType,
      label: this.labels[this.labelIndex++ % this.labels.length],
      title: 'Got you!'
    });
    this.markers.push(marker);
  }

  /** Toggles whether or not the map is hidden */
  toggleMap() {
    this.isHidden = !this.isHidden;
  }


  /**
   * Attempts to determine the location of the current user and zoom in on it
   */
  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.showPosition(position);
        this.circle.latitude = this.currentLat;
        this.circle.longitude = this.currentLong;
        if (!this.showingUser) //makes it so it doesn't render twice due to multiple calls
          this.showCustomMarker();
      });
    } else {
      alert("Location can not be accessed")
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
  saveLocation() {
    let selectedLocation: string = (document.getElementById("currentLocation") as HTMLInputElement).value;
    this.http.post<any>(environment.mapUrl + '/favoritelocations?address=' +
      selectedLocation + '&name='
      + this.favoriteName + '&userId='
      + this.principal.id, {}).subscribe(message =>
        console.log(message));
    console.log((document.getElementById("currentLocation") as HTMLInputElement).value);
    //this.refresh();
  }

  /** Retrieves the current list of user's favorite locations*/
  getLocations() {
    this.showFavorites = !this.showFavorites;
    this.http.get<any>(environment.mapUrl + '/favoritelocations/users/' + this.principal.id).subscribe(favorites => {
      //this.tokenStorage.saveToken(token);)
      let marker: any;
      for (let favorite of favorites) {
        let fav_location = new google.maps.LatLng(favorite.latitude, favorite.longitude);
        marker = new google.maps.Marker({
          position: fav_location,
          map: this.map,
          title: favorite.name
        });
        this.favoriteLocations.push(marker);
      }
    }
    )
  }
  tabSelect($event) {
    console.log($event);
  }
  //**Hides user's saved locations **/
  hideLocations() {
    this.showFavorites = !this.showFavorites;
    for (let favorite of this.favoriteLocations) {
      favorite.setMap(null);
    }
    if (this.marker) {
      this.marker.setMap(null);
    }
  }
  /**TODO: Should refresh map once a location is either saved or deleted.**/
  refresh() {
    for (let favorite of this.favoriteLocations) {
      favorite.setMap(null);
    }
    if (this.marker) {
      this.marker.setMap(null);
    }
    this.http.get<any>(environment.mapUrl + '/favoritelocations/users/' + this.principal.id).subscribe(favorites => {
      let marker: any;
      for (let favorite of favorites) {
        let fav_location = new google.maps.LatLng(favorite.latitude, favorite.longitude);
        marker = new google.maps.Marker({
          position: fav_location,
          map: this.map,
          title: favorite.name
        });
        this.favoriteLocations.push(marker);
      }
    }
    )
  }

  /**Delete a saved location by name */
  deleteLocation() {
    this.http.delete<any>(environment.mapUrl + '/favoritelocations?name='
      + this.deleteFavorite + '&userId='
      + this.principal.id, {}).subscribe(message =>
        console.log(message));
    console.log((document.getElementById("currentLocation") as HTMLInputElement).value);
    //this.refresh();
  }
}
