import { element } from 'protractor';
import { Router } from '@angular/router';
import { Login } from '../../models/login.model';
import { NgZone } from '@angular/core';
import { Role } from '../../models/role.model';
import { User } from '../../models/user.model';
import { Component, OnInit } from '@angular/core';
import { Office } from '../../models/office.model';
import { AuthService } from '../../services/auth.service';
import { ContactInfo } from '../../models/contact-info.model';
import { UserControllerService } from '../../services/api/user-controller.service';
import { Car } from '../../models/car.model';
import { Link } from '../../models/link.model';
import { GeocodeService } from '../../services/geocode.service';
import { CustomtimePipe } from '../../pipes/customtime.pipe';
import { HttpClient } from '@angular/common/http';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { ContactType } from 'aws-sdk/clients/route53domains';
import { environment } from '../../../environments/environment';



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
  _address: string;
  /** The day the User's batch ends*/
  batchEnd: any;
  /** Array of User's contact-info from DB */
  contactInfoArray: ContactInfo[] = [];
  /** Whether the user can make changes (Currently not used) */
  canEdit = false;
  /** List of offices held by the user */
  officeObjectArray: Office[] = [];
  /** Current office being examined */
  officeObject: Office;
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
  /** Holds the list of contact-info items for the currently logged user */
  result: boolean;
  car: Car;
  location: Location;
  startTime: Date;
  pipe: CustomtimePipe = new CustomtimePipe();
  /** Pre-constructed list of possible contact-types in DB */
  contactInfoTypes = ["Cell Phone", "Email", "Slack", "Skype", "Discord", "Facebook", "GroupMe", "Other", "Venmo"];

  session: boolean;


  /**
   * Sets up the component with the User Service injected
   * @param userService - Allows the component to work with the user service (for updating)
   * @param {AuthService} authService - Allows Authentication Services to be utilized
   */
  constructor(private userService: UserControllerService,
    private authService: AuthService, private zone: NgZone, private locationSerivce: GeocodeService,
    private router: Router,
    private http: HttpClient) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  /**
  * Sets up the form with data about the durrent user
  */
  ngOnInit() {

    this.authService.principal.subscribe(user => {
      this.principal = user;
      if (this.principal.id > 0) {
        this.existingBio = this.principal.bio;
        this.firstName = this.principal.firstName;
        this.lastName = this.principal.lastName;
        this.username = this.principal.email;
        this._address = this.principal.location.address;
        this.batchEnd = new Date(this.principal.batchEnd).toLocaleDateString();
        this.startTime = this.pipe.transform(this.principal.startTime);
        console.log(this.startTime);
        this.getInfoById();

        //this.getOffice();


        this.getRole();
        this.getState();
        this.filteredUsers = this.users;


        //loads the first car. done this way because original batch made car-user relationship a 1 to many
        //should've been a one to one
        console.log("PRINTING OUT CAR = " + this.principal.cars[0].match(/\d+/)[0]);

        this.userService.getCarById(Number(this.principal.cars[0].match(/\d+/)[0])).subscribe(e => {
          this.car = e;
          console.log("PRINTING OUT E KEVIN = " + JSON.stringify(e));
        });

        this.sessionCheck();
      }
      console.log(user);
      if (this.principal) {

      }
    });

    this.getOffice();

    console.log(this.officeObject);
    console.log(this.principal);
  }

  sessionCheck() {
    if (this.principal.id > 0) {
      this.session = true;
    } else {
      this.session = false;
    }
  }

  /**
   * Get contact-info for specified user-id
   */
  getInfoById() {
    //return this.http.get<ContactInfo[]>("http://turtlejr.sps.cuny.edu:5555/contact-info/58");
    console.log("pre");
    console.log(this.principal.id);
    console.log("post");  
    console.log(environment.userUrl+"/contact-info/c/"+this.principal.id);
     this.http.get(environment.userUrl+"/contact-info/c/"+this.principal.id).subscribe(
       response => {
        // console.log(this.contactInfoArray.length)
        this.contactInfoArray = response as ContactInfo[];
        console.log("CONTACT INFO ARRAY: " + this.contactInfoArray);
        this.contactInfoArray.forEach(function (element) {
          console.log(element.type);
        });
        console.log(response);
      });
    //get json array that is for slack and isolate id
  }


/**
 * Configure and prepare object to update user contact info fields.
 */
  updateContactInfo(type, content) {
    console.log("TYPE: " + type);
    console.log("CONTENT: " + content);
    console.log(this.contactInfoTypes);
    let typeId: Number;

    let updatedContact: ContactInfo = {
      id: this.principal.id,
      type: type,
      info: content
    };
    console.log("PREP'D INFO OBJECT: " + JSON.stringify(updatedContact));
    this.contactInfoTypes.forEach(function (value, i) {
        if(type == value){
          typeId = i+1;
        }
    });
    
    //The existing model does not match up to the DB config
    let contact_info_obj = {
      id: this.principal.id,
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
    // document.getElementById("email").removeAttribute("disabled");
    // document.getElementById("password").removeAttribute("disabled");
    // document.getElementById("confirmPassword").removeAttribute("disabled");
    document.getElementById('address').removeAttribute('disabled');
    //document.getElementById('batchEnd').removeAttribute('disabled');
    //document.getElementById('dayStart').removeAttribute('disabled');
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
    //document.getElementById('errorMessage').removeAttribute('hidden');
  }

  /**
   * Updates the user once he/she is content with the updates
   */
  submitChanges() {
    this.principal.firstName = this.firstName;
    this.principal.lastName = this.lastName;
    // this.principal.address = this.address2;
    // this.principal.startTime = this.startTime(); //Need this, but currently no value
    this.authService.changePrincipal(this.principal);
    this.userService.update().then();
    this.authService.changePrincipal(this.principal);
    // debug console.log("routing");
    this.router.navigate(['userProfile']);
  }

  onAddressSelect(address: string) {
    this.zone.run(() => (this.principal.location.address = address));
    this.populateLocation();
  }

  //Populate user location by finding the latitude and logitude via Maps service. 
  populateLocation() {
    this.locationSerivce.getlocation(this.principal.location).subscribe(data => {
      console.log(data);
      this.principal.location = data;
    });
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

  getOffice() {
    this.userService.getOfficeByLink(this.principal.office).subscribe(data => {
      this.officeObject = data;
    });
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
  tabSelect($event) {
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

  registerCar() {
    console.log("going to register car");
    this.router.navigate(['/cars']);
  }
}
