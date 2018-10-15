import { Component, OnInit } from '@angular/core';

/** Holds the two components for user matching and selects which to display based on whether view is desktop or mobile */
@Component({
  selector: 'app-rideswipe',
  templateUrl: './rideswipe.component.html',
  styleUrls: ['./rideswipe.component.css']
})
export class RideswipeComponent implements OnInit {

  /** Whether the view is mobile (Desktop is the default) */
  public mobile = false;

  /**
   * @ignore
   */
  constructor() { }

  /**
   * Decides whether to set the view to mobile or not
   */
  ngOnInit() {
    if (window.screen.width <= 430) { // 768px portrait
      this.mobile = true;
    }
  }
}
