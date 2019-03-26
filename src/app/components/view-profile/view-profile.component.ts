import { Router } from '@angular/router';
import { Login } from '../../models/login.model';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';
import { Location } from '../../models/location.model';
import { Component, OnInit } from '@angular/core';
import { Office } from '../../models/office.model';
import { AuthService } from '../../services/auth.service';
import { ContactInfo } from '../../models/contact-info.model';
import { UserControllerService } from '../../services/api/user-controller.service';

/**
 * Represents the page that allows users to view (and edit) their profile
 */
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {
  /** The User being selected */
  currentUser: User;
  /** The current role of the logged on user in string form */
  currentRole: Role;
  /** The first name of the user (hooked to form item in html) */
  firstName: string;
  /** The last name of the user (hooked to form item in html) */
  lastName: string;
  /** The user name of the user (hooked to form item in html) */
  username: string;
  /** The old password of the user (will be hooked up to form in html) */
  oldPassword: string;
  /** The new password of the user (hooked to form item in html) */
  password: string;
  /** The new password of the user, used to confirm User knows the password (hooked to form item in html) */
  confirmPassword: string;
  /** The address of the user (hooked to form item in html) */
  address2: string;
  /** The day the User's batch ends*/
  batchEnd: any;
  contactInfoArray: ContactInfo[] = [];
  /** Whether the user can make changes (Currently not used) */
  canEdit = false;
  /** List of offices held by the user */
  officeObjectArray: Office[] = [];
  /** Current office being examined */
  officeObject: Office;
  officeAddress: string;
  /** User's active state */
  active: string;
  existingBio: string;
  existingBioStatus: boolean = false;
  principal: User;
  currentState: string;
  /** Holds the list of all users in the system */
  users: any[];
  /** Holds the list of users filtered with search query */
  filteredUsers: any[];
  result: boolean;
  location : Location;

  /**
   * Sets up the component with the User Service injected
   * @param userService - Allows the component to work with the user service (for updating)
   * @param {AuthService} authService - Allows Authentication Services to be utilized
   */
  constructor(private userService: UserControllerService, private authService: AuthService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  /**
  * Sets up the form with data about the durrent user
  */
  ngOnInit() {
    this.authService.principal.subscribe(user => {
      this.principal = user;
      if (this.principal) {
        this.existingBio = this.principal.bio;
        this.firstName = this.principal.firstName;
        this.lastName = this.principal.lastName;
        this.username = this.principal.email;
        this.location = this.location;
        this.address2 = this.principal.location.address;
        this.batchEnd = new Date(this.principal.batchEnd).toLocaleDateString();

        

        //this.getOffice();

        
        this.getRole();
        this.getState();
        this.filteredUsers = this.users;
      }
    });
  }

  /**
   * Allows the form to be edited
   */
  edit() {
    document.getElementById('firstName').removeAttribute('disabled');
    document.getElementById('lastName').removeAttribute('disabled');
    // document.getElementById("email").removeAttribute("disabled");
    // document.getElementById("password").removeAttribute("disabled");
    // document.getElementById("confirmPassword").removeAttribute("disabled");
    document.getElementById('address').removeAttribute('disabled');
    document.getElementById('batchEnd').removeAttribute('disabled');
    document.getElementById('dayStart').removeAttribute('disabled');
    document.getElementById('switchRoles').removeAttribute('hidden');
    // Had to put this in an if; Page would break if Admin or Trainer clicked edit
    // Since for them, this button didn't exist to make visible
    if (this.currentRole === Role.Driver || this.currentRole === Role.Rider) {
      document.getElementById('switchStates').removeAttribute('hidden');
    }
    document.getElementById('edit').style.display = 'none';
    document.getElementById('submit').style.display = 'inline';
    // document.getElementById("batchEnd").setAttribute("type", "date");
    // document.getElementById("currentOffice").style.display = "none";
    // document.getElementById("selectOffice").style.display = "inline";
    document.getElementById('errorMessage').removeAttribute('hidden');
  }

  /**
   * Updates the user once he/she is content with the updates
   */
  submitChanges() {
    this.principal.firstName = this.firstName;
    this.principal.lastName = this.lastName;
    // this.principal.startTime = this.startTime(); //Need this, but currently no value
    this.authService.changePrincipal(this.principal);
    this.userService.update().then();
    this.authService.changePrincipal(this.principal);
    // debug console.log("routing");
    this.router.navigate(['userProfile']);
  }

  /**
   * Enables limited ability to modify the User's role in the system
   */
  switchRole() {
    if (this.principal.role === Role.Driver) {
      this.principal.role = Role.Rider;
      this.getRole();
    } else if (this.principal.role === Role.Rider) {
      this.principal.role = Role.Driver;
      this.getRole();
    } else {
      console.log('nope');
    }
  }

  switchState() {
    if (this.principal.active === 'ACTIVE') {
      this.principal.active = 'INACTIVE';
      this.getState();
    } else if (this.principal.active === 'INACTIVE') {
      this.principal.active = 'ACTIVE';
      this.getState();
    } else {
      console.log('Invalid State');
    }
  }

  /**
   * Gets the list of offices from the database
   */
  getOffices() {
    this.userService.getAllOffices().subscribe(data => {
      this.officeObjectArray = data;
    });
  }

  getOffice(){
    this.userService.getOfficeByLink(this.principal.office).subscribe( data =>{
      if(data){
        var address = data.address;
        this.officeAddress = address;
        console.log(data.address);
        console.log(this.officeAddress);
      }
    });
    console.log(this.officeAddress);
  }

  /**
   * Sets up the User's current role in the system
   */
  getRole() {
    this.currentRole = this.principal.role;
  }

  getState() {
    this.currentState = this.principal.active;
  }

  updatePassword() {
    this.userService.updatePassword(this.principal.email, this.oldPassword, this.password).subscribe();
  }


  updateUserStatus(id: number, active: string) {
    if (active !== 'DISABLED') {
      this.result = window.confirm('Are you sure you want to disable this account?');
      active = 'DISABLED';
    } else {
      this.result = window.confirm('Are you sure you want to enable this account?');
      active = 'ACTIVE';
    }
    if (this.result) {
      this.userService.updateStatus(id, active).then();
      location.reload(true);
    } else {
      alert('No changes will be made');
    }
  }

  /** Revert a trainer to a user */
  makeRider(id: number) {
    this.result = window.confirm('Are you sure you want to make this trainer a rider?');
    if (this.result) {
      this.userService.updateRole(id, Role.Rider).then();
      location.reload(true);
    } else {
      alert('No changes will be made');
    }
  }

  makeTrainer(id: number) {
    this.result = window.confirm('Are you sure you want to make this user a trainer?');
    if (this.result) {
      this.userService.updateRole(id, Role.Trainer).then();
      location.reload(true);
    } else {
      alert('No changes will be made');
    }
  }

  makeAdmin(id: number) {
    this.result = window.confirm('Are you sure you want to make this user an admin?');
    if (this.result) {
      this.userService.updateRole(id, Role.Admin).then();
      location.reload(true);
    } else {
      alert('No changes will be made');
    }
  }
  tabSelect($event){
    console.log($event);
  }

  /** Sets up contact information */
  addContact(): void {
    const contact: ContactInfo = {
      id: null,
      type: null,
      info: null
    };

    this.contactInfoArray.push(contact);
  }

  updateBio(bioInput: string) {
    this.userService.updateBio(bioInput);
    this.principal.bio = bioInput;
    this.authService.changePrincipal(this.principal);
    this.router.navigate(['/userProfile']);
    this.existingBio = bioInput;
  }

  changeExistingBioStatus() {
    if (this.existingBioStatus != undefined) {
      this.existingBioStatus = true;
    }
  }

}
