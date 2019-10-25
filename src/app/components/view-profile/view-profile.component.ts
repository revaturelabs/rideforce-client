import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { Location } from '../../models/location';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserService } from '../../services/user.service';

/**
 * Represents the page that allows users to view (and edit) their profile
 */
@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.css']
})
export class ViewProfileComponent implements OnInit {

  // When changes are submitted, this will read "Changes submitted successfully!"
  responseText = "";

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
  // Temporary storage of user activity for workaround to select
  userActivityString: string;
  /** The address of the user (hooked to form item in html) */
  _address: string;
  city: string;
  state: string;
  zip: number;
  /** The day the User's batch ends*/
  batchEnd: any;
  /** Whether the user can make changes (Currently not used) */
  canEdit = false;
  /** User's active state */
  active: string;
  principal: User;
  currentState: boolean;
  /** Holds the list of all users in the system */
  users: any[];
  /** Holds the list of users filtered with search query */
  filteredUsers: any[];
  /** Holds the list of contact-info items for the currently logged user */
  result: boolean;
  location: Location;
  startTime: Date;
  userActivityTypes = ["Active", "Inactive"];

  session: boolean;


  /**
   * Sets up the component with the User Service injected
   * @param userService - Allows the component to work with the user service (for updating)
   * @param {AuthService} authService - Allows Authentication Services to be utilized
   */
  constructor(
    private userService: UserService,
    //private userService: UserControllerService,
    // private authService: AuthService, 
    private zone: NgZone, 
    // private locationSerivce: GeocodeService,
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {

    this.principal = JSON.parse(localStorage.getItem('currentUser'));
    //this.principal = this.userServ.register();

    if(this.principal==null){
      this.firstName = "Error: First Name not found.";
      this.lastName = "Error: Last Name not found.";
      this.username = "Error: Username not found.";
      this.currentState = false;
      this._address = "Error: Address not found.";
      //var actelem = document.getElementById("user_activity");
      //console.log(actelem);
      // @ts-ignore
      this.userRolePlaceholderString = this.userRoleTypes[1];
      this.userActivityString = this.userActivityTypes[1];
    }else{
      this.firstName = this.principal.fname;
      this.lastName = this.principal.lname;
      this.username = this.principal.email;
      this.currentState = this.principal.isActive;
      this._address = this.principal.location.address;
      this.city = this.principal.location.city;
      this.state = this.principal.location.state;
      this.zip = parseInt(this.principal.location.zip);
      this.userActivityString = this.getStatus();
    }

    console.log(this.principal);
  }


  getRoleId(roleIn : string) {
    if (roleIn == "Driver") {
      return 1;
    }
    else if (roleIn == "Rider") {
      return 2;
    }
  }

  /**
   * Sets the users role(s).
   */
  setRole(roleIn : string) {
    //if no role has been selected
    if (this.principal.roles == undefined) {
      this.principal.roles = [];      
      this.principal.roles.push({id: this.getRoleId(roleIn), rname: roleIn});  //roleIn will either be 'rider' or 'driver'
    }
    else {
      let index = null; //if the user has already selected a role, this index will represent where it is in the 'roles' array
      for (let i in this.principal.roles) {
        if (this.principal.roles[i].rname === roleIn) {
          index = i;
        }
      }
      if (index != null) {  //if the user has deselected a role
        this.principal.roles.splice(index, 1); //remove the role from the roles array
      }
      else {  //the user has selected a second role
        this.principal.roles.push({id: this.getRoleId(roleIn), rname: roleIn});
      }
    }
  }

  //this colors the 'rider' and 'driver' buttons if they are selected
  colorButtons(roleIn : string) {
    if (this.principal.roles != undefined) {
      for (let i in this.principal.roles) {
        if (this.principal.roles[i].rname == roleIn) {
          return "lightblue";
        }
      }
    }
    return "white";
  }


  getStatus(){
    if(this.principal == null){
      return "Inactive";
    }else{
      if(this.principal.isActive){
        return "Active";
      }else{
        return "Inactive";
      }
    }
  }

  getStatusBool(status : string) {
    if(this.principal == null){
      return false;
    }else{
      if(status === "Active"){
        return true;
      }else{
        return false;
      }
    }
  }


  edit() {
    document.getElementById('firstName').removeAttribute('disabled');
    document.getElementById('lastName').removeAttribute('disabled');
    document.getElementById('password').removeAttribute('hidden');
    // document.getElementById("email").removeAttribute("disabled");
    // document.getElementById("password").removeAttribute("disabled");
    // document.getElementById("confirmPassword").removeAttribute("disabled");
    document.getElementById('user_activity').removeAttribute('disabled');
    document.getElementById('user_activity').removeAttribute('hidden');
    document.getElementById('decoy_user_activity').setAttribute('hidden', 'true');
    var actelem2 = document.getElementById("user_activity");

    document.getElementById('rider').removeAttribute('disabled');
    document.getElementById('driver').removeAttribute('disabled');
    console.log("Status is: " + this.getStatus());
    // @ts-ignore
    actelem2.value = this.getStatus();
    document.getElementById('address').removeAttribute('disabled');
    document.getElementById('city').removeAttribute('disabled');
    document.getElementById('state').removeAttribute('disabled');
    document.getElementById('zip').removeAttribute('disabled');
    document.getElementById('edit').style.display = 'none';
    document.getElementById('submit').style.display = 'inline';

    //document.getElementById('errorMessage').removeAttribute('hidden');
    
  }

  /**
   * Updates the user once he/she is content with the updates
   */
  submitChanges() {
    this.principal.fname = this.firstName;
    this.principal.lname = this.lastName;
    this.principal.location.address = this._address;
    this.principal.location.city = this.city;
    this.principal.location.state = this.state;
    this.principal.location.zip = this.zip + "";

    var activeElement = document.getElementById("user_activity");
    // @ts-ignore
    this.principal.isActive = this.getStatusBool(activeElement.value);

    console.log(this.principal);

    this.userService.updateUser(this.principal).subscribe(
      (response) => {
        console.log(response);
        localStorage.setItem("currentUser", JSON.stringify(this.principal));
        this.router.navigate(['userProfile']);
        this.responseText = "Changes submitted successfully!";
      },
      (response) => {
        console.log(response);
      }  
    );
  }



  
}
