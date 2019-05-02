import { filter } from 'rxjs/operators';
import { Login } from '../../models/login.model';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserControllerService } from '../../services/api/user-controller.service';
import { DownloadService } from '../../services/download.service';
import { DomSanitizer } from '@angular/platform-browser';
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
  role: Role;
  /**
   * Just a boolean stating whether the dropdown has been toggled.
   */
  dropped: boolean = false;
  /*
  * Used for PWA install
  */
  deferredInstall = null;
  isInstallable: boolean = false;

  principal: User;

  /**
   * Sets up the component with relevent services
   * @param {AuthService} authService - Allows Authentication Services to be utilized
   * @param {UserControllerService} userService - Allows User Services to be utilized
   * @param {Router} route - Allows Nav compnent to switch between sub-components
   */
  constructor(public authService: AuthService,
    private downloadService: DownloadService,
    private userService: UserControllerService,
    public DomSanitizationService: DomSanitizer,
    private route: Router) {
    route.events.pipe(filter(e => e instanceof NavigationStart))
      .subscribe(e => this.sessionCheck());

    // checks if criteria for being installable are met
    // Note this will never be triggerable if the app is currently installed
    // To uninstall a PWA go to chrome://apps/ right click on the app (rideshare-client) and select remove from chrome
    window.addEventListener('beforeinstallprompt', (event) => {
      this.deferredInstall = event;
      this.isInstallable = true;
    });
  }

  /**
   * Sets up the Log in Session appearence
   */

  private imageFile: any;

  ngOnInit() {
    this.authService.principal.subscribe(p => {
      this.principal = p;
      if (this.principal.id > 0) {
        this.role = this.principal.role;
        this.sessionCheck();
      }
    });
  }

downloadFile() {
    this.downloadService.downloadFile(this.principal.id.toString()).subscribe(resp => {
      this.createImageFromBlob(resp);
    }, error => {
      console.log(error);
    });

  console.log('Download service called');
  //console.log(this.imageFile);
}

createImageFromBlob(image: Blob) {
  const reader = new FileReader();
  reader.addEventListener('load', () => {
     this.imageFile = reader.result;
  }, false);

  if (image) {
     reader.readAsDataURL(image);
  }
}
  /**
   * Updates session, telling if the user is logged in or not
   */
  sessionCheck() {
    if (this.principal.id > 0) {
      this.downloadFile();
      this.session = true;
    } else {
      this.session = false;
    }
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
   * Allows User to log out of their session
   * uses await/async to avoid forcing User to reload manually to see the 'log in' button after log out
   */
  async logout() {
    this.authService.logout();
    this.principal = new Login();
    this.principal.id = 0;
    this.authService.changePrincipal(this.principal);
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
    if (this.dropped === true) {
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
    }// brings up install prompt and if installed button disappears
  }
}
