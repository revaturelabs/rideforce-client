import { Component, OnInit, NgZone } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgbTabset, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { AddressModel } from '../../models/address.model';
import { User } from '../../models/user.model';
import { Car } from '../../models/car.model';
import { ContactInfo } from '../../models/contact-info.model';
import { AuthService } from '../../services/auth.service';
import { Office } from '../../models/office.model';
import { UserControllerService } from '../../services/api/user-controller.service';
import { FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';




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
  requiredFields: Boolean = true;

  currentTab: number = 1;

  userObject: User;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  passwordConfirm: string;
  token: string;
  searchedAddress: string;

  officeObject: Office[] = [];
  // Home address
  address1: string;

  // office Address
  address2: string;



  registerForm: FormGroup;
  validatorFn: Validators;
  myForm: FormGroup;

  bio: string;
  // Array of contact info
  contactInfoArray: ContactInfo[] = [];
  contactTypeArray: string[] = ['Phone', 'Email', 'Slack', 'Skype', 'Discord', 'GroupMe', 'Other'];
  contactType: string;
  contactItem: string;
  // batch end date
  batchEnd: string;

  // for drivers
  carObject: Car;
  carMake: string;
  carModel: string;
  carYear: number;
  optInToDrive: boolean;

  // booleans for car information buttons
  btnCarInfo: Boolean = false;

  constructor(private zone: NgZone, private auth: AuthService, private userService: UserControllerService) { }

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

  AddCarInfo() {
    if (this.btnCarInfo) {
      this.carMake = '';
      this.carModel = '';
      this.carYear;
      this.btnCarInfo = false;
    }
    else if (!this.btnCarInfo) {
      this.btnCarInfo = true;
    }
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

  createUserObject() {
    this.userObject.firstName = this.firstName;
    this.userObject.lastName = this.lastName;
    this.userObject.contactInfo = [];
    this.userObject.batchEnd = this.batchEnd;
    this.userObject.email = this.username;
    this.userObject.active = true;
    this.userObject.address = this.address1;
    this.userObject.office = this.address2;
    this.userObject.cars = [];
    //this wil change when we have offices set up
    this.userObject.office = '/offices/1';

    //get id from user after post and associate with a car object
    //this.carObject.id = owner from post
  }

  getOffices() {
    this.userService.getAllOffices().subscribe(data => {
      this.officeObject = data;
    });
  }

  tabSelect(e: NgbTabChangeEvent)
  {
    if(Number(e.nextId) > this.currentTab)
    {
      e.preventDefault();
    }
  }

  accountInfoNext() {
    if (this.firstName && this.lastName && this.username
      && this.password && this.passwordConfirm && this.token
      && this.address2 && this.batchEnd) {
      this.requiredFields = true;
      this.currentTab++;
      this.tabset.select('2');
    }
    else {
      this.requiredFields = false;
    }
  }

  checkCarInfo()
  {
    
  }

  bioNext() {
    this.currentTab++;
    this.tabset.select('3');
  }

  bioPrevious() {
    this.tabset.select('1');
  }

  carNext() {
    this.currentTab++;
    this.tabset.select('4');
  }

  carPrevious() {
    this.tabset.select('2');
  }

  reviewPrevious() {
    this.tabset.select('3');
  }
}
