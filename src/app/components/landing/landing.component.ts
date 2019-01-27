import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { UserControllerService } from '../../services/api/user-controller.service';
import { AuthService} from '../../services/auth.service';
import { Auth0Service } from '../../services/auth0.service'
import { Login } from 'src/app/classes/login';
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
   * Will store the current role of the user for the purpose of utilizing *ngIf rendering on the navBar
   */
  role: String;

  principal : Login;

  /**
   * Creates the Landing Component
   * @param {UserControllerService} userService - Allows Component to utilize User Functionality
   * @param {Auth0Service} auth0Service - Provides Auth0 functionality
   */
  constructor(
    private auth0Service: Auth0Service,
    private userService: UserControllerService,
    private auth : AuthService
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
    this.auth.principal.subscribe(user =>{
      this.principal = user;});
    this.sessionCheck();
    this.setCurrentRole();
  }

  /**
   * Checks to see if there is a session or not
   */
  sessionCheck() {
    this.session = this.principal===null;
  }

  /**
   * Calls Auth0 remote login page
   */
  launchAuth0() {
    this.auth0Service.login();
  }

   /**
   * Sets the role of the Current user to determine what functionality should be available
   */
  setCurrentRole() {
    this.role = this.principal.role;
  }

}
