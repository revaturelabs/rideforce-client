import { Role } from '../../models/role';
import { User } from '../../models/user';
import { Component, OnInit } from '@angular/core';
// import { AuthService } from '../../services/auth.service';

/**
 * Supports the Carousel Appearence as a Site Intro
 */
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  /** Holds the current user of the program */
  currentUser: User;
  /** Whether a User is, in fact, logged on */
  session: boolean;
  /**
 * Will store the current role of the user for the purpose of utilizing *ngIf rendering on the navBar
 */
  roles: Role[];

  /**
   * Creates the Landing Component
   */
  constructor() {}

  /**
   * Initializes the component by retrieving the User
   */
  ngOnInit() {
  }

  /**
   * Checks to see if there is a session or not
   */
  sessionCheck() {
    if (this.currentUser.uid !== 0) {
      this.session = true;
    } else {
      this.session = false;
    }
  }

  /**
  * Sets the role of the Current user to determine what functionality should be available
  */
  setCurrentRole() {
    this.roles = this.currentUser.roles;
  }
}
