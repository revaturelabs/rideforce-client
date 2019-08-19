import { Router } from '@angular/router';
import { Login } from '../../models/login.model';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit, Injectable } from '@angular/core';
import { UserControllerService } from '../../services/api/user-controller.service';
import { makeAnimationEvent } from '@angular/animations/browser/src/render/shared';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
@Injectable()
export class ViewUsersComponent implements OnInit {
  currentUser: User;
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
  /** Holds the list of all users in the system */
  users: any[];
  /** Holds the list of users filtered with search query */
  filteredUsers: any[];
  /** Holds list of all users that you are paginating*/
  paginatedUsers: any[];
  /**Number of pages */
  numPages: any[];
  totalPage: number;
  /**save the current page for next and back buttons */
  currPage: number;
  /** Whether the user can make changes (Currently not used) */
  canEdit = false;
  /** User's active state */
  active: string;
  userId: number;
  userStatus: string;
  principal: User;
  currentRole: Role;
  currentState: string;
  //User firstname
  accntFirstName: string;
  accntLastName: string;
  accntRole: string;
  accntActive: string;
  accntEmail: string;
  //pagination
  pager: any = {};
  pagedItems: any[];
  private allItems: any[];

  constructor(private userService: UserControllerService, private authService: AuthService, private router: Router) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  /**
  * Sets up the form with data about the durrent user
  */
  ngOnInit() {
   


    console.log('ngOnInit');
    this.authService.principal.subscribe(user => {
      this.principal = user;
      console.log(this.principal);
    });

    console.log('getting users');
    this.getUsers().then(data => {
      this.users = data;
      this.filterUsers('');
    });
    this.getRole();
    this.getState(); 

  }

  switchRole() {
    if (this.principal.role === Role.Driver) {
      this.principal.role = Role.Rider;
      this.authService.changePrincipal(this.principal);
      this.getRole();
    } else if (this.principal.role === Role.Rider) {
      this.principal.role = Role.Driver;
      this.authService.changePrincipal(this.principal);
      this.getRole();
    } else {
      console.log('nope');
    }
  }

  switchState() {
    if (this.principal.active === 'ACTIVE') {
      this.principal.active = 'INACTIVE';
      this.authService.changePrincipal(this.principal);
      this.getState();
      console.log("swtching to inactive");
    } else if (this.principal.active === 'INACTIVE') {
      this.principal.active = 'ACTIVE';
      this.authService.changePrincipal(this.principal);
      this.getState();
      console.log("swtching to active");
    } else {
      console.log('Invalid State');
    }
  }

  getRole() {
    this.currentRole = this.principal.role;
  }

  getState() {
    this.currentState = this.principal.active;
  }
  /** Sets up all users in the system */
  getUsers() {
    let data;
    console.log('hitting users');
   

    if (this.principal.role === Role.Admin) {
      return this.userService.getAllUsers().then((x) => {
        data = x.filter(y => y.role === Role.Driver || y.role === Role.Rider || y.role === Role.Trainer || y.role === Role.Admin);
        this.users = data;
        return data;
      });
    } else if (this.principal.role === Role.Trainer) {
      this.userService.getAllUsers().then((x) => {
        data = x.filter(y => y.role === Role.Driver || y.role === Role.Rider);
        this.users = data;
      });
    }
  }


  paginate(users: any[], pageSize: number, pageNumber: number) {
    this.currPage = pageNumber;
    --pageNumber;
    const result = users.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
    console.log(pageNumber, pageSize);
    console.log('Page number: ' + this.numPages);
    this.paginatedUsers = result;
    console.log('how many paginated users?  ', this.paginatedUsers);
    // this.filterUsers("");
    return this.paginatedUsers;
  }

  dividePages(users: any[], divider: number) {
    this.numPages = [];
    let counter = 0;
    this.totalPage = Math.ceil(users.length / 10);
    console.log(this.totalPage);
    counter = Math.round(users.length / divider);
    let n = 1;
    while (n <= counter) {
      this.numPages.push(n++);
    }
    console.log('Number of pages: ' + this.numPages);
   
    return this.numPages;
  }

  confirmUserStatus(id: number, active: string) {
    console.log('confirming');
    this.userId = id;
    this.userStatus = active;
    console.log(this.userId);
    console.log(this.userStatus);
  }

  updateUserStatus() {
    console.log('updating');
    if (this.userStatus !== 'DISABLED') {
      // this.result = window.confirm("Are you sure you want to disable this account?");
      this.userStatus = 'DISABLED';
    } else {
      // this.result = window.confirm("Are you sure you want to enable this account?");
      this.userStatus = 'ACTIVE';
    }

    this.userService.updateStatus(this.userId, this.userStatus).then();
    this.router.navigate(['/viewUsers']);
  }

  setUserId(id: number) {
    this.userId = id;
  }
  //set the whole user
  setUser(id: number, fName: string, lName: string, email: string, role, active: string) {
    this.userId = id;
    this.accntFirstName = fName;
    this.accntLastName = lName;
    this.accntEmail = email;
    this.accntRole = role;
    this.accntActive = active;
  }

  makeTrainer() {
    // this.result = window.confirm("Are you sure you want to make this user a trainer?");
    this.userService.updateRole(this.userId, Role.Trainer).then();
    this.router.navigate(['/viewUsers']);
  }


  makeAdmin() {
    // this.result = window.confirm("Are you sure you want to make this user an admin?");
    this.userService.updateRole(this.userId, Role.Admin).then();
    this.router.navigate(['/viewUsers']);
  }

  makeDriver() {
    // this.result = window.confirm("This user is now a Driver");
    this.userService.updateRole(this.userId, Role.Driver).then();
    this.router.navigate(['/viewUsers']);
  }

  makeRider() {
    // this.result = window.confirm("This user is now a Rider.");
    // console.log("Called makeRider");
    this.userService.updateRole(this.userId, Role.Rider).then();
    this.router.navigate(['/viewUsers']);
  }


  public filterUsers(query) {
    console.log('query: ' + query);
    console.log('how many users: ' + this.users.length);
    if (query.length < 1) {
      console.log('returning all users: ', this.users.length);
      this.filteredUsers = this.users;
      this.paginate(this.filteredUsers, 10, 1);
      this.dividePages(this.filteredUsers, 10);
      return;
    }
    query = query.trim();
    const queryStrings = query.split(' ');
    this.filteredUsers = this.users.filter(user => {
      for (let key in user) {
        let data = user[key];
        if (typeof data === "string") {
          data = data.toLowerCase();
          for (let searchTerm of queryStrings) {
            searchTerm = searchTerm.toLocaleLowerCase();
            let found = data.search(searchTerm);
            if (found > -1) {
              return user;
            }
          }
        }
      }
    });
    this.paginate(this.filteredUsers, 10, 1);
    this.dividePages(this.filteredUsers, 10);
  }

  reload() {
    this.router.navigate(['/viewUsers']);
  }

  //submit changes user depending on new accntRole
  changeRole() {
    console.log("clicked on");
    if (this.accntRole == "") {
      console.log("nothing Happens");
    }
    else if (this.accntRole == "ADMIN") {
      console.log("Made into an Admin");
      this.makeAdmin();
    }
    else if (this.accntRole == "TRAINER") {
      console.log("Made into a Trainer");
      this.makeTrainer();
    }
    else if (this.accntRole == "DRIVER") {
      console.log("Made into a Driver");
      this.makeDriver();
    }
    else if (this.accntRole == "RIDER") {
      console.log("Made into Rider");
      this.makeRider();
    }
    this.updateUserStatus();
  }

  //change state between active/inactive
  changeState() {
    if (this.accntActive == "") {
      console.log("nothing to change");
    }
    else if (this.accntActive == "ACTIVE") {
      console.log("making account active");
      this.switchState();
    }
    else if (this.accntActive == "INACTIVE") {
      console.log("making account inactive");
      this.switchState();
    }
    this.updateUserStatus();
  }
}
