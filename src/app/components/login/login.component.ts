import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../models/user';
import { Role } from '../../models/role';
import { NgForm } from '@angular/forms';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

declare var $: any;

/**
 * Responsible for providing a user the ability to log in
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  /**
   * String bound to Email field via [(ngModel)]
   */
  userEmail: string;
  /**
   * String bound to Password field via [(ngModel)]
   */
  userPass: string;
  /**
   * User model sent to the backend via Http POST
   * Contains blank fields except for defined email and password
   * To be compared to full user entities on the backend
   * Backend sends a reply with with a full user on successful match
   */
  currentUser: User = new User();

  /**
   * Sets up the Login compoennt with dependency injection
   * @param {UserService} userServ - gets user information from the back end with login function - defines navbar display with isLoggedIn
   * @param {Router} route - provides the ability to navigate to landing if user is already logged on
   */
  constructor(
    private userServ: UserService,
    private route: Router
  ) { }

  /**
   * Checking to see if there is a current user, and if there is, redirects to landing.
   */
  ngOnInit() {
    if (sessionStorage.getItem('currentuser') == null || sessionStorage.getItem('currentuser') == '') {
      this.route.navigateByUrl('landing');
    }
  }

  /**
   * Gets the parameters from the login fields.
   * On success, sets the currentUser in sessionStorage and routes to landing.
   * If the login fails, displays the error message sent by the server under the password field.
   */
  login() {
    this.currentUser.email = this.userEmail;
    this.currentUser.password = this.userPass;
    //console.log(this.currentUser)

    this.userServ.login(this.currentUser).subscribe(
      (resUser) => {
        //console.log(resUser)
        sessionStorage.setItem('currentUser', JSON.stringify(resUser));
        this.userServ.isLoggedIn = true;
        this.route.navigateByUrl('landing');
      },
      (resErr) => {
        var messageLogin = document.getElementById('errorMessageLogin');
        messageLogin.style.display = 'block';
        messageLogin.style.color = 'red';
        messageLogin.innerHTML = resErr.message;
      }
    )
  }
}
