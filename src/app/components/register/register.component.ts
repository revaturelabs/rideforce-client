import { Router } from '@angular/router';
import { Role } from '../../models/role.model';
import { ViewChild, NgZone } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { KJUR, KEYUTIL, RSAKey } from 'jsrsasign';
import { HttpClient } from '@angular/common/http';
import { Office } from '../../models/office.model';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ContactInfo } from '../../models/contact-info.model';
import { environment } from '../../../environments/environment';
import { UserRegistration } from '../../models/user-registration.model';
import { UserControllerService } from '../../services/api/user-controller.service';
import { User } from '../../models/user.model';
import { GeocodeService } from '../../services/geocode.service';
import { Location } from '../../models/location.model';

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

  user: User = new User();

  /** User Roles */
  roles = Role;
  /** Current Office */
  office: Office;
  /** Office Locations */
  offices: Office[];
  /** Possible Contact Types */
  contactTypes: string[];
  /** Password Confirmation Model */
  passwordConfirm: string;
  /** Contact Info Model */
  contactInfo: ContactInfo;
  /** Map containing JWK's */
  jwks: Map<String, RSAKey>;
  /** User Registration Info Model */
  ur: UserRegistration;
  /** Tabset Object */
  @ViewChild(NgbTabset) private tabset: NgbTabset;


  /**
   * Import services.
   * @param userService contains various user services.
   */
  constructor(private http: HttpClient, private router: Router, private zone: NgZone, private userService: UserControllerService, private locationService: GeocodeService) {}

  /**
   * Initialize variables.
   */
  ngOnInit() {
    this.user.location = new Location;

    this.jwks = new Map();
    this.ur = new UserRegistration();
    this.contactInfo = { type: 'Cell Phone', id: null, info: null };
    this.userService.getAllOffices().subscribe(offices => (this.offices = offices));
    this.contactTypes = ['Cell Phone', 'Email', 'Slack', 'Skype', 'Discord', 'Facebook', 'GroupMe', 'Other'];
    this.http.get<{ keys: { kid: string }[] }>(environment.userUrl + '/.well-known/jwks.json')
      .subscribe(d => d.keys.forEach(k => this.jwks.set(k.kid, KEYUTIL.getKey(k))));
  }

  /**
   * Checks if the provided registration token is valid and updates the user with its data.
   */
  validateToken() {
    try {
      // Parse the token
      const parsedToken = KJUR.jws.JWS.parse(this.user.registrationToken);
      // Attempt to verify the token
      if (KJUR.jws.JWS.verifyJWT(this.user.registrationToken, this.jwks.get(parsedToken.headerObj.kid), { alg: [`${parsedToken.headerObj.alg}`] })) {
        // Set the office based on the token data
        this.offices.filter(o => o.id === parsedToken.payloadObj.oid)
          .forEach(o => {
            this.office = o;
            this.user.office = '/offices/' + this.office.id;
          });
        console.log(parsedToken);
        // Set the batch end date based on the token data
        this.user.batchEnd = new Date(parsedToken.payloadObj.bed * 1000).toISOString().split('T')[0];
      } else {
        throw new Error('Token not valid');
      }
    } catch (err) {
      console.log(err);
      // Token is invalid, reset values
      this.office = null;
      this.user.office = null;
      this.user.batchEnd = null;
    }
  }

  /**
   * Adds contact into to the current user.
   */
  addContactInfo() {
    this.ur.user.contactInfo.push(this.contactInfo);
    this.contactInfo = { type: 'Cell Phone', id: null, info: null };
  }

  /**
   * Sets the users role.
   * @param role the role to set for the user.
   */
  onRoleSelect(role: Role) {
    console.log(this.user);
    this.user.role = role;
    console.log(this.user);
    console.log(this.user.role);
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
    this.userService.createUser(this.user).subscribe(data => {
      alert(data);
      console.log(this.user);
      this.router.navigate(['/landing']);
    }, error => {
        alert("There was an error during registration.");
      }
    );
  }

  //Populate user location by finding the latitude and logitude via Maps service. 
  populateLocation() {
    this.locationService.getlocation(this.user.location).subscribe(data => {
      console.log(data);
      this.user.location = data;
    });
  }
}
