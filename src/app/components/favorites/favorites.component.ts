import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

/** Provides an over view of User Likes, distinguishing between the mobile view and desktop view */
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  /** Whether or not the Device is a mobile device */
  public mobile = false;

  /**
   * Simply sets up the Favorites component.
   * @param {AuthService} authService - Allows Authentication Services to be utilized
   * @param {Router} route - Allows Nav compnent to switch between sub-components
   */
  constructor(
    private authService: AuthService,
    private route: Router
    ) { }

  /** Checks to see if the device is amobile device and sets view accordingly */
  ngOnInit() {
    if (sessionStorage.length == 0)
      this.route.navigate(["/landing"]);
    if (window.screen.width <= 430) { // 768px portrait
      this.mobile = true;
    }
  }

}
