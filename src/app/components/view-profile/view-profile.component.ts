import { Component, OnInit, Testability } from '@angular/core';
import { UserControllerService } from '../../services/api/user-controller.service';
import { User } from '../../models/user.model';
import { Office } from '../../models/office.model';

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
  /**
   * Sets up the component with the User Service injected
   * @param userService - Allows the component to work with the user service (for updating)
   */
  constructor(private userService: UserControllerService) { }
  /** The first name of the user (hooked to form item in html) */
  firstName: string;
  /** The last name of the user (hooked to form item in html) */
  lastName: string;
  /** The user name of the user (hooked to form item in html) */
  username: string;
  /** The password of the user (hooked to form item in html) */
  password: string;
  /** The password of the user, used to confirm User knows the password (hooked to form item in html) */
  confirmPassword: string;
  /** The address of the user (hooked to form item in html) */
  address2: string;
  /** The day the User's batch ends*/
  batchEnd: any;

  /** Whether the user can make changes (Currently not used) */
  canEdit = false;
  /** List of offices held by the user */
  officeObjectArray: Office[] = [];
  /** Current office being examined */
  officeObject: Office;
  /** User's active state */
  active: string;
   /**
   * Sets up the form with data about the durrent user
   */
  ngOnInit() {
    this.firstName = sessionStorage.getItem("firstName");
    this.lastName = sessionStorage.getItem("lastName");
    this.username = sessionStorage.getItem("userEmail");
    this.address2 = sessionStorage.getItem("address");
    this.batchEnd = new Date(sessionStorage.getItem("batchEnd")).toLocaleDateString();
    this.getOffices();
    this.getUsers();
    this.getRole();
    this.getState();
  }

  /**
   * Allows the form to be edited
   */
  edit() {
    document.getElementById("firstName").removeAttribute("disabled");
    document.getElementById("lastName").removeAttribute("disabled");
    document.getElementById("email").removeAttribute("disabled");
    document.getElementById("password").removeAttribute("disabled");
    document.getElementById("confirmPassword").removeAttribute("disabled");
    document.getElementById("address").removeAttribute("disabled");
    document.getElementById("batchEnd").removeAttribute("disabled");
    document.getElementById("dayStart").removeAttribute("disabled");
    document.getElementById("switchRoles").removeAttribute("hidden");
    document.getElementById("switchStates").removeAttribute("hidden");
    document.getElementById("edit").style.display = "none";
    document.getElementById("submit").style.display = "inline";
    document.getElementById("batchEnd").setAttribute("type", "date");
    document.getElementById("currentOffice").style.display = "none";
    document.getElementById("selectOffice").style.display = "inline";
    document.getElementById("errorMessage").removeAttribute("hidden");
  }

  /**
   * Updates the user once he/she is content with the updates
   */
  submitChanges() {

    sessionStorage.setItem('firstName', this.firstName);
    sessionStorage.setItem('lastName', this.lastName);
    sessionStorage.setItem('userEmail', this.username);
    sessionStorage.setItem('address', this.address2);
    sessionStorage.setItem('batchEnd', this.batchEnd);
    sessionStorage.setItem('role', this.currentRole);
    //if(document.getElementById("activeState")) 
    this.userService.update().then();
    window.location.reload(true);
  }

  /**
   * Enables limited ability to modify the User's role in the system
   */
  switchRole() {
    if (sessionStorage.getItem('role') === 'DRIVER') {
      sessionStorage.setItem('role', 'RIDER');
      this.getRole();
    } else if (sessionStorage.getItem('role') === 'RIDER') {
      sessionStorage.setItem('role', 'DRIVER');
      this.getRole();
    } else {
      console.log('nope');
    }
  }

  switchState() {
    if(sessionStorage.getItem('active') === 'ACTIVE') {
      sessionStorage.setItem('active', 'INACTIVE');
      this.getState();
    } else if (sessionStorage.getItem('active') === 'INACTIVE') {
      sessionStorage.setItem('active', 'ACTIVE');
      this.getState();
    } else {
      console.log("Invalid State");
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
  /** The current role of the logged on user in string form */
  currentRole: string;
  /**
   * Sets up the User's current role in the system
   */
  getRole() {
    this.currentRole = sessionStorage.getItem('role');
  }
  currentState: string;
  getState() {
    this.currentState = sessionStorage.getItem('active');
  }

  /** Holds the list of all users in the system */
  users: any[];
  /** Sets up all users in the system */
  getUsers() {
    let data;
    if(sessionStorage.getItem('role') === 'ADMIN') {
      this.userService.getAllUsers().then((x) => { data = x.filter(x => x.role === 'DRIVER' || x.role === 'RIDER' || x.role === 'TRAINER'); this.users = data });
    } else if (sessionStorage.getItem('role') === 'TRAINER') {
      this.userService.getAllUsers().then((x) => { data = x.filter(x => x.role === 'DRIVER' || x.role === 'RIDER')})
    }
  }

  result : boolean;
  updateUserStatus(id : number, active: string) {
    if(active !== 'DISABLED') {
      this.result = window.confirm("Are you sure you want to disable this account?");
      active = 'DISABLED';
    } else {
      this.result = window.confirm("Are you sure you want to enable this account?");
      active = 'ACTIVE';
    }
    if(this.result) {
      this.userService.updateStatusAndRole(id, active).then()
    } else {
      alert('No changes will be made');
    }
  }

  updateUserRole(id: number, role: string) {
    if(role === 'TRAINER') {
      this.result = window.confirm("Are you sure you want to make this user a trainer?");
      role = 'TRAINER';
    } else {
      this.result = window.confirm("Are you sure you want to make this user an admin?");
      role = 'ADMIN';
    }
    if(this.result) {
      this.userService.updateStatusAndRole(id, role).then();
    } else {
      alert('No changes will be made');
    }
  }
}
