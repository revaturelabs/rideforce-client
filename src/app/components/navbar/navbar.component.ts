import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/api/user-controller.service';
import { AuthService } from '../../services/auth.service';
import { Router, NavigationStart } from '@angular/router';
import { User } from '../../models/user.model';
import { Auth0Service } from '../../services/auth0.service';
import { filter } from 'rxjs/operators';
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
   * Will store the current role of the user for the purpose of utilizing *ngIf rendering on the navBar
   */
  role: String;
  /**
   * Just a boolean stating whether the dropdown has been toggled.
   */
  dropped: boolean = false;
  /*
  * Used for PWA install 
  */
  deferredInstall = null;
  isInstallable: boolean = false;

  /**
   * Sets up the component with relevent services
   * @param {Auth0Service} auth0 - Provides Auth0 functionality
   * @param {AuthService} authService - Allows Authentication Services to be utilized
   * @param {UserControllerService} userService - Allows User Services to be utilized
   * @param {Router} route - Allows Nav compnent to switch between sub-components
   */
  constructor(
    private auth0: Auth0Service,
    public authService: AuthService,//made public so it can build
    private userService: UserControllerService,
    private route: Router

  ) {

    route.events.pipe(
      filter(e => e instanceof NavigationStart)
    ).subscribe(e => {
      this.sessionCheck();
    });

    //checks if criteria for being installable are met
    //Note this will never be triggerable if the app is currently installed
    //To uninstall a PWA go to chrome://apps/ right click on the app (rideshare-client) and select remove from chrome
    window.addEventListener('beforeinstallprompt', (event) => {
      this.deferredInstall = event;
      this.isInstallable = true;
    });

  }

  /**
   * Sets up the Log in Session appearence
   */
  ngOnInit() {
    this.sessionCheck();
    this.setCurrentRole();
  }

  /**
   * Updates session, telling if the user is logged in or not
   */
  sessionCheck() {
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

  /**
   * Sets the role of the Current user to determine what functionality should be available
   */
  setCurrentRole() {
    this.role = sessionStorage.getItem('role');
  }

  /**
   * Allows User to log out of their session, informing
   * Auth0 API that a logout has occured
   */
  logout0() {
    this.auth0.logout0();
  }

  /**
   * Allows User to log out of their session
   * uses await/async to avoid forcing User to reload manually to see the 'log in' button after log out
   */
  async logout() {
    sessionStorage.clear();
    if (this.route.url === '/landing') {
      location.reload(true);
    } else {
      await this.route.navigate(['/landing']);
      location.reload(true);
    }
  }

  /** Toggles a drop-down menu close to the log-out option */
  drop() {
    // this.dropped= !this.dropped;
    if (this.dropped == true) {
      setTimeout(() => {
        this.dropped = !this.dropped;
      }, 390);
    } else {
      this.dropped = !this.dropped;
    }
  }
  /*Allows installation of PWA */
  install() {

    if (this.deferredInstall) {
      this.deferredInstall.prompt();
      this.deferredInstall.userChoice
        .then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        this.isInstallable = false;
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          this.deferredInstall = null;
        });
     
    }//brings up install prompt and if installed button disappears

  }




}

