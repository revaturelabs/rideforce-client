import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Login } from '../../models/login.model';

/** Holds the two components for user matching and selects which to display based on whether view is desktop or mobile */
@Component({
  selector: 'app-rideswipe',
  templateUrl: './rideswipe.component.html',
  styleUrls: ['./rideswipe.component.css']
})
export class RideswipeComponent implements OnInit {

  /** Whether the view is mobile (Desktop is the default) */
  public mobile = false;

  principal : Login;
  /**
   * Sets up a router for managing the Desktop vs mobile component
   * @param {Router} route - Allows Nav compnent to switch between sub-components
   */
  constructor(
    private route: Router,
    private authService :AuthService
    ) { }

  /**
   * Decides whether to set the view to mobile or not
   */
  ngOnInit() {
    this.authService.principal.subscribe(user => {
      this.principal = user
    if (this.principal.id <1) {
      this.route.navigate(['/landing']);
    }
  });
    if (window.screen.width <= 430) { // 768px portrait
      this.mobile = true;
    }
  }
}
