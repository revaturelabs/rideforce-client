import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../../models/login.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from '../../../environments/environment';

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
   * code to verifiy forgotten password
   */
  forgotCode: string;

  /**
   * The password associated with the indended account
   */
  userPass: string;

  sentLink: boolean;
  errorLink: boolean;

  /**
   * The email to resend confirmation link to
   */
  reEmail: string;

  /**
   * The User to log on to
   */
  currentUser: User;

  principal: User;

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
     // /*debug*/ console.log("in reset");
    try {
      var messageLogin = document.getElementById('errorMessageLogin');
      messageLogin.style.display = "none";
      const cognitoUser = this.createCognitoUser(this.userEmail);

      // /*debug*/ console.log("aws");
      cognitoUser.forgotPassword({
        onSuccess: function (result) {
          // /*debug*/ console.log('call result:' + result);
          $("#forgotModal").modal();
        },
        onFailure: function (err) {
           /*debug*/ console.log(err);
          messageLogin.style.display = 'block';
          messageLogin.style.color = 'red';
          switch(err.name){
            case "UserNotFoundException":{
              messageLogin.innerHTML = "Email not found.";
              break;
            }
            case "LimitExceededException":{
              messageLogin.innerHTML = err.message;
              break;
            }
            default:{
              messageLogin.innerHTML = "ERROR";
            }
          }

        }
      });
    } catch (err) {
     // /*debug*/ console.log("catch");
      var messageLogin = document.getElementById('errorMessageLogin');
      messageLogin.style.display = 'block';
      messageLogin.style.color = 'red';
      messageLogin.innerHTML = "Please enter email.";
    }


  }


  resetPassword(form: NgForm) {
    const cognitoUser = this.createCognitoUser(this.userEmail);
    cognitoUser.confirmPassword(form.value.verifyCode, form.value.resetPassword, {
      onSuccess: () => {
        
        /*debug*/ console.log("resetPassword(): changed")
        $("#forgotModal").modal("hide");
        var messageLogin = document.getElementById('errorMessageLogin');
        messageLogin.style.display = 'block';
        messageLogin.style.color = 'green';
        messageLogin.innerHTML = "Password changed.";
        this.route.navigateByUrl("/");
        //$('#forgotModal').modal("close");
      },
      onFailure: err => {
         /*debug*/ console.log(err);
        switch (err.name) {
          case "CodeMismatchException": {
            let input: any = "";
            input = document.getElementById("verifyCode");
            input.value = "";
            var error = document.getElementById("verifyMsg");
            form.form.controls["verifyCode"].setErrors({ 'incorrect': true });
            error.innerHTML = "Invalid Code";
            break;
          }
          default:{
          }
        }
      }
    });
  }


  createCognitoUser(email: string): CognitoUser {
    const userPool = new CognitoUserPool(environment.cognitoData);
    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    return cognitoUser;
  }

  resendEmail() {
    console.log('resendEmail');
    this.authService.resendConfirmation(this.reEmail).subscribe(complete =>{
      this.errorLink = false;
      this.sentLink = true;
    }, error =>{
      this.errorLink = true;
      this.sentLink = false;
    });

  }

  initModal(){
    console.log("Initializing modal");
    this.errorLink = false;
    this.sentLink = false;
    this.reEmail = "";
  }
}
