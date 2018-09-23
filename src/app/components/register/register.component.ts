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

  registerForm: FormGroup;
  validatorFn: Validators;

  myForm: FormGroup;
  passwordFormGroup: FormGroup;
  registrationFormGroup: FormGroup;


  constructor(private userService: UserControllerService, private formBuilder: FormBuilder) {

   }

  ngOnInit() {
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
