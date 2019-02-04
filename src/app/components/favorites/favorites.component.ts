import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Login } from '../../classes/login';

/** Provides an over view of User Likes, distinguishing between the mobile view and desktop view */
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  /** Whether or not the Device is a mobile device */
  public mobile = false;

  principal: Login;

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
    this.authService.principal.subscribe(user => {
      this.principal = user;
      if (this.principal.id < 1)
        this.route.navigate(["/landing"]);
      if (window.screen.width <= 430) { // 768px portrait
        this.mobile = true;
      }
    });
  }

}
