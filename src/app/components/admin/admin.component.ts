import { Component, OnInit } from '@angular/core';
import { UserControllerService } from '../../services/api/user-controller.service';
import { Office } from '../../models/office.model';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

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
   * @param {AuthService} authService - Allows Authentication Services to be utilized
   * @param {Router} route - Allows Nav compnent to switch between sub-components
   */
  constructor(
    private userService: UserControllerService,
    private authService: AuthService,
    private route: Router
    ) { }

  /** Initilaizes the Component with the offices */
  ngOnInit() {
    if (!this.authService.isTrainer())
      this.route.navigate(["/landing"]);
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
