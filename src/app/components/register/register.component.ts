import { Router } from '@angular/router';
import { ViewChild, NgZone } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { KJUR, KEYUTIL, RSAKey } from 'jsrsasign';
import { HttpClient } from '@angular/common/http';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user';
import { Role } from '../../models/role';


/**
 * Used for new user registration.
 */
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [NgbTabset]
})
export class RegisterComponent implements OnInit {
  user: User;

  /** Password Confirmation Model */
  passwordConfirm: string;
  /** Tabset Object */
  @ViewChild(NgbTabset) private tabset: NgbTabset;


  /**
   * Import services.
   * @param userService contains various user services.
   */
  constructor(
    private http: HttpClient, 
    private router: Router, 
    private zone: NgZone 
    // private userService: UserControllerService, 
    // private locationService: GeocodeService
    ) {}

  /**
   * Initialize variables.
   */
  ngOnInit() {
    this.user = new User();
    this.passwordConfirm = "";
    // this.http.get<{ keys: { kid: string }[] }>(environment.userUrl + '/.well-known/jwks.json')
    //   .subscribe(d => d.keys.forEach(k => this.jwks.set(k.kid, KEYUTIL.getKey(k))));
  }

  validateEmail() {
    // for (let i = 0; i < this.user.email.length; i++) {
    //   if (this.user.email[i] === '@') {
        // return (this.user.email.substr(i, this.user.email.length-i) === "revature.com");
    //   }
    // }
    return (this.user.email === "^[a-zA-Z0-9_.+!%#$&'*?^{|}`~-]+@?(revature)\.com$");
  }

  /**
   * Sets the users role.
   * @param role the role to set for the user.
   */
  onRoleSelect(role: Role) {
    console.log(this.user);
    this.user.roles.push(role);
    console.log(this.user);
    console.log(this.user.roles);
  }

  /**
   * Sets the users address.
   * @param address the address to set for the user.
   */
  onAddressSelect(address: string) {
    this.zone.run(() => (this.user.location.address = address));
    this.populateLocation();
  }

  /**
   * Changes from the current tab to the desired one.
   * @param newTab the tab to change to.
   */
  changeTab(newTab: string) {
    // Enable the next tab
    this.tabset.tabs.find(t => t.id === newTab).disabled = false;
    // Disable the previous tab
    this.tabset.tabs.find(t => t.id === this.tabset.activeId).disabled = true;
    // Switch to the new tab
    this.tabset.select(newTab);
  }

 //Register new user with Cognito in server-side application. 
  register() {
    this.populateLocation();
    console.log(this.user);
    // this.userService.createUser(this.user).subscribe(data => {
    //   alert(data);
    //   console.log(this.user);
    //   this.router.navigate(['/landing']);
    // }, error => {
    //     alert("There was an error during registration.");
    //   }
    // );
  }

  //Populate user location by finding the latitude and logitude via Maps service. 
  populateLocation() {
    // this.locationService.getlocation(this.user.location).subscribe(data => {
    //   console.log(data);
    //   this.user.location = data;
    // });
  }
}


//Testing branch comment