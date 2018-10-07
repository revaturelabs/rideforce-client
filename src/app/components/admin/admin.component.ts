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

  getRegistrationKey() {
    this.userService.getRegistrationKey().subscribe(
      data => {
        this.registrationKey = data;
        this.dateLocationEncryption();
      }
    )
  }

  dateLocationEncryption(){
    let middleEncryption = btoa(this.officeObject + "~" + this.batchEnd);
    if (middleEncryption.length != 28)
      middleEncryption = 'XcvF' + middleEncryption;
    this.encryptedLocationDate = middleEncryption;
  }

  getOffices() {
    this.userService.getAllOffices().subscribe(data => {
      this.officeObjectArray = data;
      this.officeObject = '';
    });
  }
}
