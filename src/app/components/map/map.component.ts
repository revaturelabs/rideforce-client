import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
  providers: [
    NgbTabset
  ]
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
