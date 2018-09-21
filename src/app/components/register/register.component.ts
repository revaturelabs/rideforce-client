import { Component, OnInit } from '@angular/core';
import { ViewChild } from '@angular/core'
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { AddressModel } from '../../models/address.model';


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

  address: AddressModel = new AddressModel();
  states: string[] = ["AL","AK","AR","AZ","CA","CO","CT","DE","DC","FL","GA","HI","ID","IL","IN","IA","KS",
  "KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR",
  "PA","PR","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"]

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
    this.carMake = "";
    this.carModel = "";
    this.carYear = "";
    this.btnCarInfo = false;
  }

  setCarButtonTrue()
  {
    this.btnCarInfo = true;
  }

  addContact(): void {
    this.contactInfo.push()
  }

}
