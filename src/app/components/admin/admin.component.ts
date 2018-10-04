import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/api/user-controller.service';
import { Office } from '../../models/office.model';

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

  officeObjectEncrypted: string;
  batchEndEncrypted: string;

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

    this.officeObjectEncrypted = this.officeObject;
    this.batchEndEncrypted = this.batchEnd;
  }

  getOffices() {
    this.userService.getAllOffices().subscribe(data => {
      this.officeObjectArray = data;
      this.officeObject = '';
    });
  }
}
