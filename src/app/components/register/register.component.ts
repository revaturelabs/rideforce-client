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
  constructor(private http: HttpClient, private router: Router, private zone: NgZone, private userService: UserControllerService) {}

  /**
   * Initialize variables.
   */
  ngOnInit() {
    this.jwks = new Map();
    this.ur = new UserRegistration();
    this.contactInfo = { type: 'Cell Phone', id: null, info: null };
    this.userService.getAllOffices().subscribe(offices => (this.offices = offices));
    this.contactTypes = ['Cell Phone', 'Email', 'Slack', 'Skype', 'Discord', 'Facebook', 'GroupMe', 'Other'];
    this.http.get<{ keys: { kid: string }[] }>(environment.apiUrl + '/.well-known/jwks.json')
      .subscribe(d => d.keys.forEach(k => this.jwks.set(k.kid, KEYUTIL.getKey(k))));
  }

  /**
   * Checks if the provided registration token is valid and updates the user with its data.
   */
  validateToken() {
    try {
      // Parse the token
      const parsedToken = KJUR.jws.JWS.parse(this.ur.registrationToken);
      // Attempt to verify the token
      if (KJUR.jws.JWS.verifyJWT(this.ur.registrationToken, this.jwks.get(parsedToken.headerObj.kid), { alg: [`${parsedToken.headerObj.alg}`] })) {
        // Set the office based on the token data
        this.offices.filter(o => o.id === parsedToken.payloadObj.oid)
          .forEach(o => {
            this.office = o;
            this.ur.user.office = '/offices/' + this.office.id;
          });
        console.log(parsedToken);
        // Set the batch end date based on the token data
        this.ur.user.batchEnd = new Date(parsedToken.payloadObj.bed * 1000).toISOString().split('T')[0];
      } else {
        throw new Error('Token not valid');
      }
    } catch (err) {
      console.log(err);
      // Token is invalid, reset values
      this.office = null;
      this.ur.user.office = null;
      this.ur.user.batchEnd = null;
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
    this.ur.user.role = role;
  }

  /**
   * Sets the users address.
   * @param address the address to set for the user.
   */
  onAddressSelect(address: string) {
    this.zone.run(() => (this.ur.user.address = address));
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

  /**
   * Registers a user with Cognito and the back-end.
   */
  register() {
    this.userService.createUser(this.ur).subscribe(data => {
      alert(data);
      this.router.navigate(['/landing']);
    }, error => {
        alert(error);
      }
    );
  }
}
