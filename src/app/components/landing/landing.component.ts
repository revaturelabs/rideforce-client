import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserControllerService } from '../../services/api/user-controller.service';
import { Auth0Service } from '../../services/auth0.service'
// import { Router } from '@angular/router';

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
   * Creates the Landing Component
   * @param {UserControllerService} userService - Allows Component to utilize User Functionality
   * @param {Auth0Service} auth0Service - Provides Auth0 functionality
   */
  constructor(
    private auth0Service: Auth0Service,
    private userService: UserControllerService
    ) { }

  /**
   * Initializes the component by retrieving the User
   */
  ngOnInit() {
    this.userService.getCurrentUserObservable().subscribe(
      data => {
        this.currentUser = data;
      }
    );
    this.sessionCheck();
  }

  /**
   * Checks to see if there is a session or not
   */
  sessionCheck() {
    this.session = sessionStorage.length > 0;
  }

  /**
   * Calls Auth0 remote login page
   */
  launchAuth0() {
    this.auth0Service.login();
  }
}
