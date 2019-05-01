import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Office } from '../../models/office.model';
import { AuthService } from '../../services/auth.service';
import { RegistrationToken } from '../../models/registration-token.model';
import { UserControllerService } from '../../services/api/user-controller.service';

/**
 * Allows extra features reserved for Administrators
 */
 @Component({
   selector: 'app-admin',
   templateUrl: './admin.component.html',
   styleUrls: ['./admin.component.css']
 })
 export class AdminComponent implements OnInit {
   /** Holds a list of offices */
   offices: Office[];
   /** Model for the registration token request */
   rtr: RegistrationToken;
   /** Holds the generated registration token */
   registrationToken: string;
   /*copyToClipboard message for ngif*/
   public copyToClipboard;
   /*error popup for invalid date*/   
   public invalidDate;

  /**
   * Injects services into the component.
   *
   * @param {UserControllerService} userService - Allows User Services to be utilized
   * @param {AuthService} authService - Allows Authentication Services to be utilized
   * @param {Router} route - Allows Nav compnent to switch between sub-components
   */
   constructor(private userService: UserControllerService, private authService: AuthService, private route: Router) {}

  /**
   * Initialize the component.
   */
   ngOnInit() {
     if (!this.authService.isTrainer()) {
       this.route.navigate(['/landing']);
     }
     this.rtr = new RegistrationToken();
     this.userService.getAllOffices().subscribe(offices => { this.offices = offices; this.rtr.office = offices[0]; });
   }

  /**
   * Generates a new registration key.
   */
   getRegistrationKey() {
     let today = new Date().getTime();
     let parse = Date.parse(this.rtr.batchEndDate);
     if (today > parse) {
     this.invalidDate = true;
     }
     else{
       this.userService.getRegistrationKey(this.rtr).subscribe(data => this.registrationToken = data);
     this.invalidDate = false;
     }
     this.copyToClipboard = false;
   }

   /*Function to copy generated key upon click the box*/
   copyUponclick(inputElement) {
     inputElement.select();
     document.execCommand('copy');
     inputElement.setSelectionRange(0, 0);
     this.copyToClipboard = true;
   }

 }
