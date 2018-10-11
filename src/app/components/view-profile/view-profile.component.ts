import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/api/user-controller.service';
import { User } from '../../models/user.model';
// import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { Role } from '../../models/role.model';
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

  /**
   * Sets up the form with data about the durrent user
   */
  ngOnInit() {
    // this.userService.getCurrentUserObservable().subscribe(
    //   data => {
        // this.currentUser = data;
        // console.log(this.currentUser);
      this.firstName = sessionStorage.getItem('firstName');
      this.lastName = sessionStorage.getItem('lastName');
      this.username = sessionStorage.getItem('userEmail');
      // console.log(this.userService.getOfficeByLink(this.currentUser.office).subscribe().toString());
      // document.getElementById('currentOffice').textContent = this.userService.getOfficeByLink(this.currentUser.office).toString();
      this.address2 = sessionStorage.getItem('address');
      this.batchEnd = new Date(sessionStorage.getItem('batchEnd')).toLocaleDateString();
    //   }
    // );
    this.getOffices();
    this.getUsers();
    this.getRole();
  }

  /**
   * Allows the form to be edited
   */
  edit() {
    document.getElementById('firstName').removeAttribute('disabled');
    document.getElementById('lastName').removeAttribute('disabled');
    document.getElementById('email').removeAttribute('disabled');
    document.getElementById('password').removeAttribute('disabled');
    document.getElementById('confirmPassword').removeAttribute('disabled');
    document.getElementById('address').removeAttribute('disabled');
    document.getElementById('batchEnd').removeAttribute('disabled');
    document.getElementById('batchEnd').setAttribute('type', 'date');
    document.getElementById('currentOffice').style.display = 'none';
    document.getElementById('selectOffice').style.display = 'inline';
    document.getElementById('edit').style.display = 'none';
    document.getElementById('submit').style.display = 'inline';
    document.getElementById('errorMessage').removeAttribute('hidden');
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
    this.userService.update().subscribe();
    // this.userService.updatePassword(this.currentUser.id, 'p4ssw0rd', this.password).subscribe();
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

  /** Holds the list of all users in the system */
  users: any[];
  /** Sets up all users in the system */
  getUsers() {
    let data;
    // this.postService.getPosts().then((allPosts) => {posts = allPosts; console.log(posts.results[0].id)});
    this.userService.getAllUsers().subscribe((x) => {data = x; this.users = data});
  }

  // passCheck() {
  //   if(this.password !== this.confirmPassword) {
  //     document.getElementById('passwordError').style.display = 'inline';
  //   } else {
  //     sessionStorage.setItem('userPassword', this.password);
  //   }
  // }
}
