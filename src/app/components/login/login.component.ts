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
   * code to verifiy forgotten password
   */
  // forgotCode: string;

  // sentLink: boolean;
  // errorLink: boolean;

  /**
   * The email to resend confirmation link to
   */
  // reEmail: string;
  // principal: User;

  


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
    this.userServ.login();
    // this.currentUser = new User();
    this.currentUser = {
      uid: 1,
      email: this.userEmail,
      password: this.userPass,
      fname: 'Testfirst',
      lname: 'Testlast',
      // roles: [{rid: 1, rname: 'Driver'}],
      roles: [{rid: 1, rname: 'Rider'}],
      location: {
        lid: 1,
        address: '555 Test Street',
        city: 'Morgantown',
        state: 'WV',
        zip: 55555,
        longitude: 0,
        latitude: -1
      },
      is_active: true
    }
    
    this.userServ.isLoggedIn = true;
    this.userServ.currentUser = this.currentUser;
    
    if (this.currentUser.uid !== 0) {
      this.route.navigate(['/landing']);
    }
    /*
      Use something like this when backend has login controller
    */

    // this.userLogin = this.userServ.getUserByEmail(this.userEmail);
    // this.userLogin.subscribe(
    //   (resUser) => {
    //     if(this.userPass !== resUser.password) {
    //       // Incorrect password
    //     } else {
    //       this.currentUser = resUser;
    //     }
    //   },
    //   (resErr) => {
    //     // Possibly email does not exist
    //   }
    // )
  }

  // resetEmail() {
  //    // /*debug*/ console.log("in reset");
  //   try {
  //     var messageLogin = document.getElementById('errorMessageLogin');
  //     messageLogin.style.display = "none";
  //     const cognitoUser = this.createCognitoUser(this.userEmail);

  //     // /*debug*/ console.log("aws");
  //     cognitoUser.forgotPassword({
  //       onSuccess: function (result) {
  //         // /*debug*/ console.log('call result:' + result);
  //         $("#forgotModal").modal();
  //       },
  //       onFailure: function (err) {
  //          /*debug*/ console.log(err);
  //         messageLogin.style.display = 'block';
  //         messageLogin.style.color = 'red';
  //         switch(err.name){
  //           case "UserNotFoundException":{
  //             messageLogin.innerHTML = "Email not found.";
  //             break;
  //           }
  //           case "LimitExceededException":{
  //             messageLogin.innerHTML = err.message;
  //             break;
  //           }
  //           default:{
  //             messageLogin.innerHTML = "ERROR";
  //           }
  //         }

  //       }
  //     });
  //   } catch (err) {
  //    // /*debug*/ console.log("catch");
  //     var messageLogin = document.getElementById('errorMessageLogin');
  //     messageLogin.style.display = 'block';
  //     messageLogin.style.color = 'red';
  //     messageLogin.innerHTML = "Please enter email.";
  //   }


  // }


  // resetPassword(form: NgForm) {
  //   const cognitoUser = this.createCognitoUser(this.userEmail);
  //   cognitoUser.confirmPassword(form.value.verifyCode, form.value.resetPassword, {
  //     onSuccess: () => {
        
  //       /*debug*/ console.log("resetPassword(): changed")
  //       $("#forgotModal").modal("hide");
  //       var messageLogin = document.getElementById('errorMessageLogin');
  //       messageLogin.style.display = 'block';
  //       messageLogin.style.color = 'green';
  //       messageLogin.innerHTML = "Password changed.";
  //       this.route.navigateByUrl("/");
  //       //$('#forgotModal').modal("close");
  //     },
  //     onFailure: err => {
  //        /*debug*/ console.log(err);
  //       switch (err.name) {
  //         case "CodeMismatchException": {
  //           let input: any = "";
  //           input = document.getElementById("verifyCode");
  //           input.value = "";
  //           var error = document.getElementById("verifyMsg");
  //           form.form.controls["verifyCode"].setErrors({ 'incorrect': true });
  //           error.innerHTML = "Invalid Code";
  //           break;
  //         }
  //         default:{
  //         }
  //       }
  //     }
  //   });
  // }


  // createCognitoUser(email: string): CognitoUser {
  //   const userPool = new CognitoUserPool(environment.cognitoData);
  //   const userData = {
  //     Username: email,
  //     Pool: userPool
  //   };
  //   const cognitoUser = new CognitoUser(userData);
  //   return cognitoUser;
  // }

  // resendEmail(){
    // this.authService.resendConfirmation(this.reEmail).subscribe(complete =>{
    //   this.errorLink = false;
    //   this.sentLink = true;
    // }, error =>{
    //   this.errorLink = true;
    //   this.sentLink = false;
    // });

  // }

  // initModal(){
  //   console.log("Initializing modal");
  //   this.errorLink = false;
  //   this.sentLink = false;
  //   this.reEmail = "";
  // }
}
