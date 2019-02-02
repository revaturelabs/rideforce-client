import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../classes/login';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

import { environment } from '../../../environments/environment';

/**
 * Responsible for providing a user the ability to log in
 * Only uses back end authentication, should be removed once Auth0 is fully implemented
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
   * code to verifiy forgotten password
   */
  forgotCode: string;

  /**
   * The password associated with the indended account
   */
  userPass: string;

  /**
   * The User to log on to
   */
  currentUser: User;

  principal: Login;

  /**
   * Sets up the Login compoennt with dependency injection
   * @param { AuthService} authService - Provides the ability to authenticate the user
   * @param {Router} route - provides the ability to navigate to landing if user is already logged on
   */
  constructor(
    private authService: AuthService,
    private route: Router
  ) { }

  /**
   * Checking to see if there is a current user, and if there is, redirects to landing.
   */
  ngOnInit() {
    this.authService.principal.subscribe(u => {
      this.principal = u;
      if (this.principal.id !== 0) {
        this.route.navigate(['/landing']);
      }
    })

  }

  /**
   * Gets the parameters from the login fields.
   * If the login fails, displays the error message sent by the server under the password field.
   */
  login() {
    this.authService.authenticate(this.userEmail, this.userPass);
  }

  resetEmail() {
    /*debug*/ console.log("in reset");
    const cognitoUser = this.createCognitoUser(this.userEmail);

    /*debug*/ console.log("aws");
    cognitoUser.forgotPassword({
      onSuccess: function (result) {
        /*debug*/ console.log('call result:' + result);
        
        
      },
      onFailure: function (err) {
        alert(err);
        /*debug*/ console.log(err);
      }
    });
  }


  resetPassword(form : NgForm){
    const cognitoUser = this.createCognitoUser(this.userEmail);
    cognitoUser.confirmPassword(form.value.verifyCode,form.value.resetPassword, {
      onSuccess: () => {
        console.log("changed")
      },
      onFailure: err =>{
        console.log(err);
      }
    });
  }
  createCognitoUser(email:string): CognitoUser{
    const userPool = new CognitoUserPool(environment.cognitoData);
    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    return cognitoUser;
  }
}
