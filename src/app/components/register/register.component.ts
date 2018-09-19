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

  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: number;
  bio: string;
  contactInfo: string[] = [];
  batch: string;

  // for drivers
  carMake: string;
  carModel: string;
  carYear: string;
  optInToDrive: boolean;

  constructor() { }

  ngOnInit() {
  }

}
