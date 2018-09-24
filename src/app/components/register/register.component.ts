import { Component, OnInit, NgZone } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { AddressModel } from '../../models/address.model';
import { ContactInfo } from '../../models/contact-info.model';
import { UserControllerService } from '../../services/api/user-controller.service';
import { FormGroup, Validators, FormControl, ValidatorFn, AbstractControl, FormBuilder } from '@angular/forms';
import { Register } from '../../models/register.model';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../accountinfo/accountinfo.component.css'],
  providers: [
    NgbTabset
  ]
})

export class RegisterComponent implements OnInit {

  username: string;
  password: string;
  passwordConfirm: string;
  token: string;

  searchedAddress: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  mobile: boolean;

  address: AddressModel = new AddressModel();
  states: string[] = ["AL", "AK", "AR", "AZ", "CA", "CO", "CT", "DE", "DC", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS",
    "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR",
    "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]
  registerForm: FormGroup;
  validatorFn: Validators;

  myForm: FormGroup;



  constructor(private userService: UserControllerService) {
   }

  ngOnInit() {
    if (window.screen.width <= 430) { // 768px portrait
      this.mobile = true;
    }
  }
  
  autocomplete1 (place) {
    // address object contains lat/lng to use
    this.zone.run(() => {
      this.address1 = place.formatted_address;
      //place variable has a lot of field combinations to choose from
      //currently using entire fielld
      //console.log(place);
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

  submit() {
   const account: Register = {
      username: this.username,
      password: this.password,
      token: this.token
    };
    this.userService.createUser(account).subscribe();

  }



}
