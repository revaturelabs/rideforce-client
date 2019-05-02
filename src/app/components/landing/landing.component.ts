import { Login } from '../../models/login.model';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

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
  role: Role;

  principal: User;

  /**
   * Creates the Landing Component
   * @param {UserControllerService} userService - Allows Component to utilize User Functionality
   */
  constructor(private auth: AuthService) { }

  /**
   * Initializes the component by retrieving the User
   */
  ngOnInit() {
    // console.log("oninit");
    this.auth.principal.subscribe(user => {
      this.principal = user;
      // console.log(this.principal);
      this.sessionCheck();
      this.setCurrentRole();
    });
  }

  /**
   * Checks to see if there is a session or not
   */
  sessionCheck() {
    if (this.principal.id !== 0) {
      this.session = true;
    } else {
      this.session = false;
    }
  }

  /**
  * Sets the role of the Current user to determine what functionality should be available
  */
  setCurrentRole() {
    this.role = this.principal.role;
  }
}
