import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core'
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    NgbTabset
  ]
})
export class RegisterComponent implements OnInit {

  @ViewChild(NgbTabset)
  private tabset: NgbTabset;

  mobile: Boolean = false;

  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address1: string;
  address2: string;
  city: string;

  state: string;

  zip: string;
  bio: string;
  contactInfo: string[] = [];
  batch: string;

  // for drivers
  carMake: string;
  carModel: string;
  carYear: string;
  optInToDrive: boolean;

  // booleans for car information buttons
  btnCarInfo: Boolean = false;

  constructor() { }

  ngOnInit() 
  {
    if (window.screen.width <= 430) { // 768px portrait
      this.mobile = true;
    }
  }

  setCarButtonFalse()
  {
    this.btnCarInfo = false;
  }

  setCarButtonTrue()
  {
    this.btnCarInfo = true;
  }

}
