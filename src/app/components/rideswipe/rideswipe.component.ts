import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rideswipe',
  templateUrl: './rideswipe.component.html',
  styleUrls: ['./rideswipe.component.css']
})
export class RideswipeComponent implements OnInit {

  public mobile = false;

  constructor() { }

  ngOnInit() {
    if (window.screen.width <= 430) { // 768px portrait
      this.mobile = true;
    }
  }

}
