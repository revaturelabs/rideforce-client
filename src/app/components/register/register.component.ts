import { Component, OnInit, NgZone } from '@angular/core';
import { ViewChild } from '@angular/core';
import { NgbTabset } from '@ng-bootstrap/ng-bootstrap';
import { AddressModel } from '../../models/address.model';
import { ContactInfo } from '../../models/contact-info.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [
    NgbTabset
  ]
})

export class RegisterComponent implements OnInit {



  constructor(private zone: NgZone) { }

  ngOnInit() {

  }



}
