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
  // PLACEHOLDER Temporary storage of role for workaround to design oriented around single role
  userRolePlaceholderString: string;
  // Temporary storage of user activity for workaround to select
  userActivityString: string;
  /** The address of the user (hooked to form item in html) */
  _address: string;
  /** The day the User's batch ends*/
  batchEnd: any;
  /** Whether the user can make changes (Currently not used) */
  canEdit = false;
  /** User's active state */
  active: string;
  existingBio: string;
  existingBioStatus: boolean = false;
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
  /** Pre-constructed list of possible contact-types in DB */
  contactInfoTypes = ["Cell Phone", "Email", "Slack", "Skype", "Discord", "Facebook", "GroupMe", "Other", "Venmo"];
  userRoleTypes = ["Driver", "Rider"];
  userActivityTypes = ["Active", "Inactive"];

  session: boolean;


  /**
   * Sets up the component with the User Service injected
   * @param userService - Allows the component to work with the user service (for updating)
   * @param {AuthService} authService - Allows Authentication Services to be utilized
   */
  constructor(
    private userServ: UserService,
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
      
    }

    
    //TODO: update state selector so it can be grabbed by Angular
    if(this.currentState) {

    } else {

    }

    //this.users.subscribe(user => {})

    // this.authService.principal.subscribe(user => {
    //   this.principal = user;
    //   if (this.principal.uid > 0) {
    //     this.existingBio = this.principal.bio;
    //     this.firstName = this.principal.fname;
    //     this.lastName = this.principal.lname;
    //     this.username = this.principal.email;
    //     this._address = this.principal.location.address;
    //     this.batchEnd = new Date(this.principal.batchEnd).toLocaleDateString();
    //     this.startTime = this.pipe.transform(this.principal.startTime);
    //     console.log(this.startTime);
    //     this.getInfoById();

    //     this.getRole();
    //     this.getState();
    //     this.filteredUsers = this.users;

    //     //loads the first car. done this way because original batch made car-user relationship a 1 to many
    //     //should've been a one to one
    //     //console.log("PRINTING OUT CAR = " + this.principal.cars[0].match(/\d+/)[0]);
    //     if (this.currentRole == "DRIVER") {
    //       this.userService.getCarById(Number(this.principal.cars[0].match(/\d+/)[0])).subscribe(e => {
    //         this.car = e;
    //         console.log("PRINTING OUT E KEVIN = " + JSON.stringify(e));
    //       });
    //     }

    //     this.sessionCheck();
    //   }
    //   console.log(user);
    //   if (this.principal) {

    //   }
    // });

    console.log(this.principal);
  }

  //TEMPORARY METHOD
  getRole(){
    if(this.principal == null){
      return "Rider";
    }else{
      return this.principal.roles[0].rname
    }
  }

  //TEMPORARY METHOD
  getStatus(){
    if(this.principal == null){
      return "Inactive";
    }else{
      if(this.principal.is_active){
        return "Active";
      }else{
        return "Inactive";
      }
    }
  }

  sessionCheck() {
    if (this.principal.uid > 0) {
      this.session = true;
    } else {
      this.session = false;
    }
  }

  /**
   * Get contact-info for specified user-id
   */
  /*getInfoById() {
    //return this.http.get<ContactInfo[]>("http://turtlejr.sps.cuny.edu:5555/contact-info/58");
    console.log("pre");
    console.log(this.principal.uid);
    console.log("post");  
    console.log(environment.userUrl+"/contact-info/c/"+this.principal.uid);
    this.http.get(environment.userUrl+"/contact-info/c/"+this.principal.uid).subscribe(
      response => {
        console.log(response);
      });
    //get json array that is for slack and isolate id
  }*/


/**
 * Configure and prepare object to update user contact info fields.
 */
  updateContactInfo(type, content) {
    console.log("TYPE: " + type);
    console.log("CONTENT: " + content);
    console.log(this.contactInfoTypes);
    let typeId: Number;

    this.contactInfoTypes.forEach(function (value, i) {
        if(type == value){
          typeId = i+1;
        }
    });
    
    //The existing model does not match up to the DB config
    let contact_info_obj = {
      id: this.principal.uid,
      type: typeId,
      info: content
    }
    console.log("PREP'D INFO OBJECT: " + JSON.stringify(contact_info_obj));
    this.http.post(environment.userUrl+'/contact-info/addcinfo', contact_info_obj).subscribe(
       response => {
        
        console.log("contact info sent");
        this.ngOnInit();
        });

  }


  edit() {
    document.getElementById('firstName').removeAttribute('disabled');
    document.getElementById('lastName').removeAttribute('disabled');
    document.getElementById('password').removeAttribute('hidden');
    // document.getElementById("email").removeAttribute("disabled");
    // document.getElementById("password").removeAttribute("disabled");
    // document.getElementById("confirmPassword").removeAttribute("disabled");
    document.getElementById('user_role').removeAttribute('disabled');
    document.getElementById('user_role').removeAttribute('hidden');
    document.getElementById('decoy_user_role').setAttribute('hidden', 'true');
    var actelem1 = document.getElementById("user_role");
    // @ts-ignore
    actelem1.value = this.getRole();
    document.getElementById('user_activity').removeAttribute('disabled');
    document.getElementById('user_activity').removeAttribute('hidden');
    document.getElementById('decoy_user_activity').setAttribute('hidden', 'true');
    var actelem2 = document.getElementById("user_activity");
    console.log("Status is: " + this.getStatus());
    // @ts-ignore
    actelem2.value = this.getStatus();
    //TODO: set user activity to the current user's active status
    document.getElementById('address').removeAttribute('disabled');
    //document.getElementById('batchEnd').removeAttribute('disabled');
    //document.getElementById('dayStart').removeAttribute('disabled');
    document.getElementById('switchRoles').removeAttribute('hidden');
    // Had to put this in an if; Page would break if Admin or Trainer clicked edit
    // Since for them, this button didn't exist to make visible
    document.getElementById('edit').style.display = 'none';
    document.getElementById('submit').style.display = 'inline';
    // document.getElementById("batchEnd").setAttribute("type", "date");
    // document.getElementById("currentOffice").style.display = "none";
    // document.getElementById("selectOffice").style.display = "inline";
    //document.getElementById('errorMessage').removeAttribute('hidden');
    
  }

  /**
   * Updates the user once he/she is content with the updates
   */
  submitChanges() {
    this.principal.fname = this.firstName;
    this.principal.lname = this.lastName;
    // this.principal.address = this.address2;
    // this.principal.startTime = this.startTime(); //Need this, but currently no value
    // this.authService.changePrincipal(this.principal);
    // this.userService.update().then();
    // this.authService.changePrincipal(this.principal);
    // debug console.log("routing");
    this.router.navigate(['userProfile']);
  }

  onAddressSelect(address: string) {
    this.zone.run(() => (this.principal.location.address = address));
  }

  switchState() {
    if (this.principal.isActive == true) {
      this.principal.isActive = false;
      this.getState();
    } else if (this.principal.isActive == false) {
      this.principal.isActive = true;
      this.getState();
    } else {
      console.log('Invalid State');
    }
  }

  getState() {
    this.currentState = this.principal.isActive;
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
      // this.userService.updateStatus(id, active).then();
      location.reload(true);
    } else {
      alert('No changes will be made');
    }
  }

  /** Revert a trainer to a user */
  makeRider(id: number) {
    this.result = window.confirm('Are you sure you want to make this trainer a rider?');
    if (this.result) {
      // this.userService.updateRole(id, Role.Rider).then();
      location.reload(true);
    } else {
      alert('No changes will be made');
    }
  }

  makeTrainer(id: number) {
    this.result = window.confirm('Are you sure you want to make this user a trainer?');
    if (this.result) {
      // this.userService.updateRole(id, Role.Trainer).then();
      location.reload(true);
    } else {
      alert('No changes will be made');
    }
  }

  makeAdmin(id: number) {
    this.result = window.confirm('Are you sure you want to make this user an admin?');
    if (this.result) {
      // this.userService.updateRole(id, Role.Admin).then();
      location.reload(true);
    } else {
      alert('No changes will be made');
    }
  }
  tabSelect($event) {
    console.log($event);

  }

  /** Updates the bio info and redirects to userProfile */
  updateBio() {
    document.getElementById('aboutYou').removeAttribute('disabled');
    document.getElementById('editBio').style.display = 'none';
    document.getElementById('submitBio').style.display = 'inline';
  }
  
}
