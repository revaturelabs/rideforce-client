import { Router } from '@angular/router';
import { Role } from '../../models/role.model';
import { ViewChild, NgZone } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Office } from '../../models/office.model';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { ContactInfo } from '../../models/contact-info.model';
import { UserRegistrationInfo } from '../../models/user-registration-info.model';
import { UserControllerService } from '../../services/api/user-controller.service';

/**
 * Used for new user registration.
 */
@Component({
  selector: 'app-accountinfo',
  templateUrl: './accountinfo.component.html',
  styleUrls: ['./accountinfo.component.css'],
  providers: [ NgbTabset ]
})

export class AccountinfoComponent implements OnInit {
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
  /** User Registration Info Model */
  uri: UserRegistrationInfo;
  /** Tabset Object */
  @ViewChild(NgbTabset) private tabset: NgbTabset;

  /**
   * Import services.
   * @param userService contains various user services.
   */
  constructor(private router: Router, private zone: NgZone, private userService: UserControllerService) { }

  /**
   * Initialize variables.
   */
  ngOnInit() {
    this.uri = new UserRegistrationInfo();
    this.contactInfo = { type: 'Cell Phone', id: null, info: null };
    this.userService.getAllOffices().subscribe(offices => this.offices = offices);
    this.contactTypes = ['Cell Phone', 'Email', 'Slack', 'Skype', 'Discord', 'Facebook', 'GroupMe', 'Other'];
  }

  /**
   * Checks if the provided registration token is valid and updates the user with its data.
   */
  validateToken() {
    if (this.uri.registrationToken) {
      let pref = this.uri.registrationToken.substr(0, 28);
      if (pref.startsWith('XcvF')) {
        pref = pref.substr(4);
      }
      const decrip = atob(pref).split('~');
      this.office = this.offices.filter(o => o.name === decrip[0])[0];
      this.uri.user.office = '/offices/' + this.office.id,
      this.uri.user.batchEnd = decrip[1];
    }
  }

  /**
   * Adds contact into to the current user.
   */
  addContactInfo() {
    this.uri.user.contactInfo.push(this.contactInfo);
    this.contactInfo = { type: 'Cell Phone', id: null, info: null };
  }

  /**
   * Sets the users role.
   * @param role the role to set for the user.
   */
  onRoleSelect(role: Role) {
    this.uri.user.role = role;
  }

  /**
   * Sets the users address.
   * @param address the address to set for the user.
   */
  onAddressSelect(address: string) {
    this.zone.run(() => this.uri.user.address = address);
  }

  /**
   * Changes from the current tab to the desired one.
   * @param newTab the tab to change to.
   */
  changeTab(newTab: string) {
    // Enable the next tab
    this.tabset.tabs.find((t) => t.id === newTab).disabled = false;
    // Disable the previous tab
    this.tabset.tabs.find((t) => t.id === this.tabset.activeId).disabled = true;
    // Switch to the new tab
    this.tabset.select(newTab);
  }

  /**
   * Registers a user with Cognito and the back-end.
   */
  register() {
    this.userService.createUser(this.uri).subscribe((x) => {
      this.router.navigate(['/landing']);
    });
  }
}
