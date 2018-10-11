import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/api/user-controller.service';
import { Office } from '../../models/office.model';
import { toBase64String } from '@angular/compiler/src/output/source_map';

/**
 * Allows extra features reserved for Administrators
 */
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  /** Holds a registration key that new users can use to regiser themselves */
  registrationKey: string;
  /** Holds a list of offices */
  officeObjectArray: Office[] = [];
  /** When the current batch ends */
  batchEnd: string;
  /** Holds th current office being viewed */
  officeObject;

  /** Holds the office and batch end */
  encryptedLocationDate: string;

  /**
   * Sets up Component with User Service
   * @param {UserControllerService} userService - Allows User Services to be utilized
   */
  constructor(private userService: UserControllerService) { }

  /** Initilaizes the Component with the offices */
  ngOnInit() {
    this.getOffices();
  }

  /** Alows a New registration key to be used for New User Registration */
  getRegistrationKey() {
    this.userService.getRegistrationKey().subscribe(
      data => {
        this.registrationKey = data;
        this.dateLocationEncryption();
      }
    );
  }

  /** Sets up a date and location encryption key */
  dateLocationEncryption() {
    let middleEncryption = btoa(this.officeObject + '~' + this.batchEnd);
    if (middleEncryption.length != 28) {
      middleEncryption = 'XcvF' + middleEncryption;
    }
    this.encryptedLocationDate = middleEncryption;
  }

  /**
   * Retrieves all offices, called on component initialization
   */
  getOffices() {
    this.userService.getAllOffices().subscribe(data => {
      this.officeObjectArray = data;
      this.officeObject = '';
    });
  }
}
