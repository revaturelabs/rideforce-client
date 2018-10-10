import { Component, OnInit } from '@angular/core';

/** Provides an over view of User Likes, distinguishing between the mobile view and desktop view */
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  /** Whether or not the Device is a mobile device */
  public mobile = false;

  constructor() { }

  /** Checks to see if the device is amobile device and sets view accordingly */
  ngOnInit() {
    if (window.screen.width <= 430) { // 768px portrait
      this.mobile = true;
    }
  }

}
