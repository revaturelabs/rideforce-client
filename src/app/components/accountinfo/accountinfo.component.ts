import { Component, OnInit, NgZone } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgbTabset, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { AddressModel } from '../../models/address.model';
import { User } from '../../models/user.model';
import { Car } from '../../models/car.model';
import { ContactInfo } from '../../models/contact-info.model';
import { AuthService } from '../../services/auth.service';
import { Office } from '../../models/office.model';
import { Role } from '../../models/role.model';
import { UserControllerService } from '../../services/api/user-controller.service';
import { FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { UploadService } from '../../services/upload.service';
import { Router } from '@angular/router';

/**
 * Used to allow for registration of new users
 */
@Component({
  selector: 'app-accountinfo',
  templateUrl: './accountinfo.component.html',
  styleUrls: ['./accountinfo.component.css'],
  providers: [
    NgbTabset
  ]
})

export class AccountinfoComponent implements OnInit {

  /**
   * Allows users to navigate tabs within the component
   */
  @ViewChild(NgbTabset)
  private tabset: NgbTabset;

  /**
   * Used to see if this is being viewed from a mobile phone (does not appear to be used)
   */
  mobile: Boolean = false;
  /**
   * Alrets user if required fields still need to be filled
   */
  requiredInfoFields: Boolean = true;
  /**
   * Alerts user if they need to fill out car information
   */
  requiredCarFields: Boolean = true;

  /**
   * Keeps track of which tab the new user is on
   */
  currentTab: number = 1;



  /**
   * The User being constructed
   */
  userObject: User;
  /**
   * Represents whether the user is a rider, driver, trainer, or admin
   */
  roleObject: Role;
  /**
   * The User's first name
   */
  firstName: string;
  /**
   * The User's Last name
   */
  lastName: string;
  /**
   * User name of the user
   */
  username: string;
  /**
   * Used for authenitcation
   */
  password: string;
  /**
   * Serves as the Password confirm feature
   */
  passwordConfirm: string;
  /**
   * Reports whether the passwords match
   */
  passwordsMatch: boolean;
  /**
   * The token that should have been provided by a trainor
   */
  token: string;
  /**
   * Address of the User (Does not appear to be used)
   */
  searchedAddress: string;


  /**
   * Manages the offices held by the user
   */
  officeObjectArray: Office[] = [];
  /**
   * The current Office being examined
   */
  officeObject: Office;
  /**
   * Name of the office
   */
  office: string;
  /**Home Address */
  address1: string;

  /**Office Address */
  address2: string;

  /**S3 bucket variable for selecting files */
  selectedFiles: FileList;
  /** Reference to the user profile */
  imageSrc: string;

  /** Allows for easier management of Forms in Angular */
  registerForm: FormGroup;
  /** Allows for input verification (does not appear to be used) */
  validatorFn: Validators;
  /** (Does not appear to be used) */
  myForm: FormGroup;

  /** Biography of the User */
  bio: string;
  /**Array of contact info*/
  contactInfoArray: ContactInfo[] = [];
  /** Holds the contact type */
  contactTypeArray: string[] = ['Cell Phone', 'Email', 'Slack', 'Skype', 'Discord', 'Facebook', 'GroupMe', 'Other'];
  /** Current contact type being looked at */
  contactType: string;
  /** (Does not appear to be used) */
  contactItem: string;
  /**batch end date*/
  batchEnd: string;

  /**for drivers*/
  carObject: Car;
  carMake: string;
  carModel: string;
  carYear: number;
  optInToDrive: boolean;

  /**booleans for car information buttons*/
  btnCarInfo: Number = 0;

  /**
   * Sets up the Account info service with needed services provided
   * @param {NgZone} zone - Allows the Location to be deduced
   * @param {AuthService} auth - Provides Authenitcation services (Does not appear to be used)
   * @param {UserControllerService} userService - Allows management of users
   * @param {UploadService} uploadService - allows User to upload files
   * @param {Router} router - allows page navigation to take place
   */
  constructor(private zone: NgZone,
    private auth: AuthService,
    private userService: UserControllerService,
    private uploadService: UploadService,
    private router: Router) {
      this.carObject = new Car();
     }

  /** Prepares the form and sets up validation */
  ngOnInit() {
    if (window.screen.width <= 430) { // 768px portrait
      this.mobile = true;
    }
    this.registerForm = new FormGroup({
      'username': new FormControl(this.username, [
        Validators.required
        , Validators.maxLength(15)
      ]),
      'password': new FormControl(this.password, [
        Validators.required
        , Validators.maxLength(15)
      ]),
      'passwordConfirm': new FormControl(this.passwordConfirm, [
        Validators.required
        , Validators.maxLength(15)
      ]),
      'token': new FormControl(this.token, [
        Validators.required
        // ,Validators.maxLength(15)
      ]),
    });
    this.getOffices();
  }

  /** Checks to see if the passwords match */
  check() {
    this.passwordsMatch = this.password != this.passwordConfirm;
  }

  /** Allows first address to be deduced */
  autocomplete1(place) {
    // address object contains lat/lng to use
    this.zone.run(() => {
      this.address1 = place.formatted_address;
      // place variable has a lot of field combinations to choose from
      // currently using entire field
      // console.log(place);
    });
  }

  /** Allows Second address to be deduced */
  autocomplete2(place) {
    // address object contains lat/lng to use
    this.zone.run(() => {
      this.address2 = place.formatted_address;
    });
  }

  /** Sets the User as a Driver */
  isDriver() {
    document.getElementById('riderBtn').classList.remove('selectedBtn');
    document.getElementById('driverBtn').classList.add('selectedBtn');
    this.btnCarInfo = 1;
    this.roleObject = Role.Driver;
  }

  /** Sets the User as a Rider */
  isRider() {
    document.getElementById('riderBtn').classList.add('selectedBtn');
    document.getElementById('driverBtn').classList.remove('selectedBtn');
    this.carMake = '';
    this.carModel = '';
    this.carYear;
    this.btnCarInfo = 2;
    this.roleObject = Role.Rider;
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

  /**
   * Removes the contact from the list of contact info
   * @param {ContactInfo} item - The Contact to remove
   */
  removeContact(item: ContactInfo) {
    this.contactInfoArray.splice(this.contactInfoArray.indexOf(item), 1);
  }

  /**
   * Sets up a car
   * (DEPRECATED: Moved to Car Regstration Component)
   */
  createCar() {
    this.carObject.make = this.carMake;
    this.carObject.model = this.carModel;
    this.carObject.year = this.carYear;
  }

  /**
   * Uploads image to the storage
   */
  upload() {
    const file = this.selectedFiles.item(0);
    this.imageSrc = this.uploadService.uploadfile(file);
  }

  /**
   * Manage the token
   */
  parseEncryption() {
    if (this.token) {
      let pref = this.token.substr(0, 28);
      if (pref.startsWith('XcvF')) {
        pref = pref.substr(4);
      }
      let decrip = atob(pref).split('~');
      for (let offObj of this.officeObjectArray) {
        if (offObj.name === decrip[0]) {
          this.officeObject = offObj;
        }
      }
      this.batchEnd = decrip[1];
      this.office = this.officeObject.name;
    }
  }

  /** Allows a User to select a file */
  selectFile(event) {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles[0].name);
  }

  /** Creats a user from all the required fields */
  createUserObject() {

    //this.upload();

    this.userObject = {
      id: 1,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.username,
      password: this.password,
      photoUrl: this.imageSrc,
      address: this.address2,
      office: '/offices/' + this.officeObject.id,
      // I really don't understand what this translates to on the back end, but now it is dynamic
      batchEnd: new Date(this.batchEnd).toISOString(),
      cars: [],
      active: 'ACTIVE',
      contactInfo: [],
      role: this.roleObject,
      bio: this.bio
    };
    // get id from user after post and associate with a car object
    // this.carObject.id = owner from post
    this.userService.createUser(this.userObject, this.password, this.token.substring(28))
      .then((x) => {
        sessionStorage.setItem("id", x.id.toString());
        sessionStorage.setItem("firstName", x.firstName);
        sessionStorage.setItem("lastName", x.lastName);
        sessionStorage.setItem("userEmail", x.email);
        sessionStorage.setItem("userPassword", x.password);
        sessionStorage.setItem("address", x.address);
        sessionStorage.setItem("role", x.role);
        this.router.navigate(['/map']);
      });


  }

  /** Retrieves a list of Offices from the data base usng the User Servcie */
  getOffices() {
    this.userService.getAllOffices().subscribe(data => {
      this.officeObjectArray = data;
    });
  }

  /** Processes tab updates */
  tabSelect(e: NgbTabChangeEvent) {
    if (Number(e.nextId) > this.currentTab) {
      e.preventDefault();
    }
  }

  /**
   * Validates the User input and if valid moved to the second tab
   */
  accountInfoNext() {
    if (this.firstName && this.lastName && this.username
      && this.password && this.passwordConfirm && this.token
      && this.address2 && this.batchEnd && this.password == this.passwordConfirm) {
      this.requiredInfoFields = true;
      this.currentTab++;
      this.tabset.select('2');
    } else {
      this.requiredInfoFields = false;
    }
  }

  /** Moves Registration to the Car Tab */
  bioNext() {
    this.currentTab++;
    this.tabset.select('3');
  }

  /** Moves Registration tot he first page */
  bioPrevious() {
    this.tabset.select('1');
  }

  /** Moves Registration tothe Final page */
  carNext() {

    if (this.btnCarInfo == 0) {
      this.requiredCarFields = false;
    } else if (this.btnCarInfo > 0) {
      this.requiredCarFields = true;
      this.currentTab++;
      this.tabset.select('4');
    }
  }

  /** Moves Registration to the Biography Tab */
  carPrevious() {
    this.tabset.select('2');
  }

    /** Moves Registration to the Car Tab */
  reviewPrevious() {
    this.tabset.select('3');
  }
}
