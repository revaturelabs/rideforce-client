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
  currentUser: User;
  currentState: boolean;
  /** Holds the list of all users in the system */
  users: any[];
  location: Location;
  userActivityTypes = ["Active", "Inactive"];


  constructor(
    private userService: UserService,
    private zone: NgZone, 
    private router: Router,
    private http: HttpClient) {
  }

  ngOnInit() {
    if (localStorage.getItem('currentUser') != undefined && localStorage.getItem('currentUser') != null && localStorage.getItem('currentUser') != "") {
      this.currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    }
    else {
      this.currentUser = null;
    }

    if(this.currentUser==null){
      this.router.navigate(['landing']);

    }else{
      this.firstName = this.currentUser.fname;
      this.lastName = this.currentUser.lname;
      this.username = this.currentUser.email;
      this.currentState = this.currentUser.isActive;
      this._address = this.currentUser.location.address;
      this.city = this.currentUser.location.city;
      this.state = this.currentUser.location.state;
      this.zip = parseInt(this.currentUser.location.zip);
      this.userActivityString = this.getStatus();
    }

    console.log(this.currentUser);
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
    if (this.currentUser.roles == undefined) {
      this.currentUser.roles = [];      
      this.currentUser.roles.push({id: this.getRoleId(roleIn), rname: roleIn});  //roleIn will either be 'rider' or 'driver'
    }
    else {
      let index = null; //if the user has already selected a role, this index will represent where it is in the 'roles' array
      for (let i in this.currentUser.roles) {
        if (this.currentUser.roles[i].rname === roleIn) {
          index = i;
        }
      }
      if (index != null) {  //if the user has deselected a role
        this.currentUser.roles.splice(index, 1); //remove the role from the roles array
      }
      else {  //the user has selected a second role
        this.currentUser.roles.push({id: this.getRoleId(roleIn), rname: roleIn});
      }
    }
  }

  //this colors the 'rider' and 'driver' buttons if they are selected
  colorButtons(roleIn : string) {
    if (this.currentUser != undefined && this.currentUser != null) {
      for (let i in this.currentUser.roles) {
        if (this.currentUser.roles[i].rname == roleIn) {
          return "lightblue";
        }
      }
    }
    return "white";
  }


  getStatus(){
    if(this.currentUser == null){
      return "Inactive";
    }else{
      if(this.currentUser.isActive){
        return "Active";
      }else{
        return "Inactive";
      }
    }
  }

  getStatusBool(status : string) {
    if(this.currentUser == null){
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

    document.getElementById('user_activity').removeAttribute('disabled');
    document.getElementById('user_activity').removeAttribute('hidden');
    document.getElementById('decoy_user_activity').setAttribute('hidden', 'true');
    // document.getElementById('user_activity').value = this.getStatus();
    document.getElementById('rider').removeAttribute('disabled');
    document.getElementById('driver').removeAttribute('disabled');
    console.log("Status is: " + this.getStatus());
    document.getElementById('address').removeAttribute('disabled');
    document.getElementById('city').removeAttribute('disabled');
    document.getElementById('state').removeAttribute('disabled');
    document.getElementById('zip').removeAttribute('disabled');
    document.getElementById('edit').style.display = 'none';
    document.getElementById('submit').style.display = 'inline';

    
  }

  /**
   * Updates the user once he/she is content with the updates
   */
  submitChanges() {
    this.currentUser.fname = this.firstName;
    this.currentUser.lname = this.lastName;
    this.currentUser.location.address = this._address;
    this.currentUser.location.city = this.city;
    this.currentUser.location.state = this.state;
    this.currentUser.location.zip = this.zip + "";

    var activeElement = document.getElementById("user_activity");
    // @ts-ignore
    this.currentUser.isActive = this.getStatusBool(activeElement.value);

    console.log(this.currentUser);

    this.userService.updateUser(this.currentUser).subscribe(
      (response) => {
        console.log(response);
        sessionStorage.setItem("currentUser", JSON.stringify(this.currentUser));
        this.router.navigate(['userProfile']);
        this.responseText = "Changes submitted successfully!";
      },
      (response) => {
        console.log(response);
      }  
    );
  }



  
}
