import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { MapsControllerService } from '../../services/api/maps-controller.service';
import { Location } from './../../models/location.model';
import { User } from '../../models/user.model';
import { Marker } from '../../models/marker.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [
    NgbTabset
  ]
})
export class MapComponent implements OnInit {

  private start = "herndon";
  private end = "dc";

  private dist: number;
  private time: number;

  // ------------------------------------------------------------
  public origin: google.maps.LatLngLiteral;
  public destination: google.maps.LatLngLiteral;

  driversNearBy: Marker[] = [];
  currentUser: User;
  controlmap;

  constructor(private mapService: MapsControllerService) { }

  ngOnInit() {

  }

  public getRoute() {
    this.mapService.getRoute(this.start, this.end).subscribe(
      data => {
        this.dist = data.distance;
        this.time = data.duration;
        console.log(this.dist);
        console.log(this.time);
      }
    )

  }
  // -  - - - - - - ------------------------------------------------
  mapReady($event: any) {
    this.controlmap = $event;
    this.controlmap.fitBounds({
      east: -66.94,
      north: 49.38,
      west: -124.39,
      south: 25.82
    });
  }

  updateZoomLevel() {
    if (this.controlmap.zoom <= 12) {
      this.driversNearBy = [];
      this.currentUser = null;
    }
  }


  // ---------------------------------------------------------------



}
