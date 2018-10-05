import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/api/user-controller.service';
import { Office } from '../../models/office.model';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  registrationKey: string;
  officeObjectArray: Office[] = [];
  batchEnd: string;
  officeObject;

  encryptedLocationDate: string;

  constructor(private userService: UserControllerService) { }

  ngOnInit() {
    this.getOffices();
  }

  getRegistrationKey(){
    this.userService.getRegistrationKey().subscribe(
      data => {
        this.registrationKey = data;
        this.dateLocationEncryption();
      }
    )
  }

  dateLocationEncryption(){
    this.encryptedLocationDate = btoa(this.officeObject + "~" + this.batchEnd);
  }

  getOffices() {
    this.userService.getAllOffices().subscribe(data => {
      this.officeObjectArray = data;
      this.officeObject = '';
    });
  }
}
/*
QXJsaW5ndG9ufjIwMTgtMDEtMDE=
MjAxOC0wMS0wMX5Bcmxpbmd0b24=
UmVzdG9ufjIwMTgtMDEtMDE=
MjAxOC0wMS0wMX5SZXN0b24=
/UmVzdG9ufjE5OTMtMDItMTA=
/MTk5My0wMi0xMH5SZXN0b24=
VGFtcGF+MjAxOC0wMS0wMQ==
MjAxOC0wMS0wMX5UYW1wYQ==
/VGFtcGF+MTk5My0wMi0xMA==
/MTk5My0wMi0xMH5UYW1wYQ==
Rmx1c2hpbmd+MjAxOC0wMS0wMQ==
MjAxOC0wMS0wMX5GbHVzaGluZw==
TmV3IFlvcmt+MjAxOC0wMS0wMQ==
MjAxOC0wMS0wMX5OZXcgWW9yaw==

QXJsaW5ndG9ufjIwMTItMTItMTI=
MjAxMi0xMi0xMn5Bcmxpbmd0b24=
UmVzdG9ufjIwMTItMTItMTI=
MjAxMi0xMi0xMn5SZXN0b24=
VGFtcGF+MjAxMi0xMi0xMg==
MjAxMi0xMi0xMn5UYW1wYQ==
Rmx1c2hpbmd+MjAxMi0xMi0xMg==
MjAxMi0xMi0xMn5GbHVzaGluZw==
TmV3IFlvcmt+MjAxMi0xMi0xMg==
MjAxMi0xMi0xMn5OZXcgWW9yaw==
*/