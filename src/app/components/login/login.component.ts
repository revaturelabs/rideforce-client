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
   * The "username" of the user
   */
  userEmail: string;
  /**
   * The User to log on to
   */
  currentUser: User;
  testLocation: Location;
  /**
   * The password associated with the indended account
   */
  userPass: string;


  /**
   * Sets up the Login compoennt with dependency injection
   * @param {AuthService} authService - Provides the ability to authenticate the user
   * @param {Router} route - provides the ability to navigate to landing if user is already logged on
   */
  constructor(
    // private authService: AuthService,
    private userServ: UserService,
    private route: Router
  ) { }

  /**
   * Checking to see if there is a current user, and if there is, redirects to landing.
   */
  ngOnInit() {
    // this.authService.principal.subscribe(u => {
    //   this.principal = u;
    //   if (this.principal.id !== 0) {
    //     this.route.navigate(['/landing']);
    //   }
    // })

  }

  userLogin : Observable<User>;

  /**
   * Gets the parameters from the login fields.
   * If the login fails, displays the error message sent by the server under the password field.
   */
  login() {
    this.currentUser = {
      uid: 1,
      email: this.userEmail,
      password: this.userPass,
      fname: 'Testfirst',
      lname: 'Testlast',
      // roles: [{rid: 1, rname: 'Driver'}],
      roles: [{id: 1, rname: 'Rider'}],
      location: {
        lid: 1,
        address: '555 Test Street',
        city: 'Morgantown',
        state: 'WV',
        zip: '55555',
        longitude: 0,
        latitude: -1
      },
      isActive: true
    }

    this.currentUser.email = this.userEmail;
    this.currentUser.password = this.userPass;

    this.userLogin = this.userServ.login(this.currentUser);
    this.userLogin.subscribe(
      (resUser) => {
        localStorage.setItem('currentUser', JSON.stringify(resUser));
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
