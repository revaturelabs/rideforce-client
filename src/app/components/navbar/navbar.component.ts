import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/api/user-controller.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { Auth0Service } from '../../services/auth0.service';

/**
 * Hosts the Component that allows users to navigate between components
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  /** Holds the current user of the app */
  currentUser: User;
  /**
   * Whether the User is logged on or not
   */
  session: boolean;

  /**
   * Sets up the component with relevent services
   * @param {UserControllerService} userService - allows User Services to be utilized
   * @param {Router} route - Allows Nav compnent to switch between sub-components
   */
  constructor(
    private auth0: Auth0Service,
    private userService: UserControllerService,
    private route: Router
    ) { }

  /**
   * Sets up the Log in Session appearence
   */
  ngOnInit() {
    // this.userService.getCurrentUserObservable().subscribe(
    //   data => {
    //     this.currentUser = data;
    //     // console.log(this.currentUser);
    //     document.getElementById("profilePic").setAttribute("src",this.currentUser.photoUrl);
    //   }
    // );
    // this.userService.getCurrentUserObservable().subscribe(
    //   data => {
    //     this.currentUser = data;
    //     // console.log(this.currentUser);
    //     document.getElementById("profilePic").setAttribute("src",this.currentUser.photoUrl);
    //   }
    // );
    this.sessionCheck();
  }

  /**
   * Updates the status of our session ( is the user currently logged on?)
   */
  sessionCheck() {
    console.log(sessionStorage);
    this.session = sessionStorage.length > 0;
  }
  /**
   * Sets up the current user
   */
  getCurrentUser() {
    this.userService.getCurrentUser().subscribe(
      data => {
        this.currentUser = data;
      }
    );
  }
  // checkIfLoggedIn(){
  //   if(this.userService.isLoggedIn){
  //     this.isLoggedIn = true;
  //   } 
  //   else if(!this.userService.isLoggedIn) {
  //     this.isLoggedIn = false;
  //   }
  // }

  // getCurrentUser(){
  //   this.userService.getCurrentUser().subscribe(
  //     data => {
  //       this.currentUser = data;
  //     }
  //   )
  // }

  /**
   * Allows User to log out of their session
   * uses await/async to avoid forcing User to reload manually to see the "log in" button after log out
   */

  logout0() {
    this.auth0.logout0();
  }
  async logout() {
    sessionStorage.clear();
    if (this.route.url === "/landing") {
      location.reload(true);
    } else {
      await this.route.navigate(["/landing"]);
      location.reload(true);
    }
  }
}
