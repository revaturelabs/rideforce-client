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

// Comment


@Component({
  selector: 'app-accountinfo',
  templateUrl: './accountinfo.component.html',
  styleUrls: ['./accountinfo.component.css'],
  providers: [
    NgbTabset
  ]
})

export class AccountinfoComponent implements OnInit {

  @ViewChild(NgbTabset)
  private tabset: NgbTabset;

  mobile: Boolean = false;
  requiredInfoFields: Boolean = true;
  requiredCarFields: Boolean = true;

  currentTab: number = 1;

  userObject: User;
  roleObject: Role;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  passwordConfirm: string;
  token: string;
  searchedAddress: string;

  officeObjectArray: Office[] = [];
  officeObject: Office;
  /**Home Address */
  address1: string;

  /**Office Address */
  address2: string;

  /**S3 bucket variable for selecting files */
  selectedFiles: FileList;
  imageSrc: string;

  registerForm: FormGroup;
  validatorFn: Validators;
  myForm: FormGroup;

  bio: string;
  /**Array of contact info*/
  contactInfoArray: ContactInfo[] = [];
  contactTypeArray: string[] = ['Cell Phone', 'Email', 'Slack', 'Skype', 'Discord', 'Facebook', 'GroupMe', 'Other'];
  contactType: string;
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

  constructor(private zone: NgZone, 
    private auth: AuthService, 
    private userService: UserControllerService, 
    private uploadService: UploadService,
    private router: Router) { }

  ngOnInit() {
    if (window.screen.width <= 430) { // 768px portrait
      this.mobile = true;
    }
    this.registerForm = new FormGroup({
      'username': new FormControl(this.username, [
        Validators.required,
        Validators.maxLength(15)
      ]),
      'password': new FormControl(this.password, [
        Validators.required,
        Validators.maxLength(15)
      ]),
      'passwordConfirm': new FormControl(this.passwordConfirm, [
        Validators.required,
        Validators.maxLength(15)
      ]),
      'token': new FormControl(this.token, [
        Validators.required,
        Validators.maxLength(15)
      ]),
    });
    this.getOffices();
  }


  autocomplete1(place) {
    // address object contains lat/lng to use
    this.zone.run(() => {
      this.address1 = place.formatted_address;
      // place variable has a lot of field combinations to choose from
      // currently using entire fielld
      // console.log(place);
    });
  }

  autocomplete2(place) {
    // address object contains lat/lng to use
    this.zone.run(() => {
      this.address2 = place.formatted_address;
    });
  }

  isDriver() {
    this.btnCarInfo = 1;
    this.roleObject = Role.Driver;
  }

  isRider() {
    this.carMake = '';
    this.carModel = '';
    this.carYear;
    this.btnCarInfo = 2;
    this.roleObject = Role.Rider;
  }

  addContact(): void {
    const contact: ContactInfo = {
      id: null,
      type: null,
      info: null
    };

    this.contactInfoArray.push(contact);
  }

  removeContact(item: ContactInfo) {
    this.contactInfoArray.splice(this.contactInfoArray.indexOf(item), 1);
  }

  createCar() {
    this.carObject.make = this.carMake;
    this.carObject.model = this.carModel;
    this.carObject.year = this.carYear;
  }

  updload()
  {
    const file = this.selectedFiles.item(0);
    this.imageSrc = this.uploadService.uploadfile(file);
  } 

  selectFile(event)
  {
    this.selectedFiles = event.target.files;
    console.log(this.selectedFiles[0].name)
  }

  createUserObject() {

    this.updload();

    this.userObject = {
      id: 0,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.username,
      photoUrl: this.imageSrc,
      address: this.address2,
      office: '/offices/1',
      batchEnd: new Date(this.batchEnd).toISOString(),
      cars: [],
      active: true,
      contactInfo: [],
      role: this.roleObject

    }

    //get id from user after post and associate with a car object
    //this.carObject.id = owner from post
    this.userService.createUser(this.userObject, this.password, this.token)
      .subscribe(user => {
        this.router.navigate(["/map"]);
      });

    
  }

  getOffices() {
    this.userService.getAllOffices().subscribe(data => {
      this.officeObjectArray = data;
    });
  }

  tabSelect(e: NgbTabChangeEvent) {
    if (Number(e.nextId) > this.currentTab) {
      e.preventDefault();
    }
  }

  accountInfoNext() {
    if (this.firstName && this.lastName && this.username
      && this.password && this.passwordConfirm && this.token
      && this.address2 && this.batchEnd && this.password == this.passwordConfirm) {
      this.requiredInfoFields = true;
      this.currentTab++;
      this.tabset.select('2');
    }
    else {
      this.requiredInfoFields = false;
    }
  }

  bioNext() {
    this.currentTab++;
    this.tabset.select('3');
  }

  bioPrevious() {
    this.tabset.select('1');
  }

  carNext() {

    if (this.btnCarInfo == 0) {
      this.requiredCarFields = false;
    }
    else if (this.btnCarInfo > 0) {
      this.requiredCarFields = true;
      this.currentTab++;
      this.tabset.select('4');
    }
  }

  carPrevious() {
    this.tabset.select('2');
  }

  reviewPrevious() {
    this.tabset.select('3');
  }
}
