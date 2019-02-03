import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Login } from '../classes/login';

/**
 * Allows Users to authenticate themselves with the server
 */
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private principalSource = new BehaviorSubject(new Login());
  principal = this.principalSource.asObservable();
  authToken: string;

  /**
   * Sets up the Authentication service with the required dependencies
   * @param {HttpClient} http - Our http client dependency for making http requests
   * @param {UserControllerService} userService - Service used to grab any user information from the API
   * @param {TokenStorage} tokenStorage - Used to save our generated token locally
   * @param {Router} route - enables navigation between components (does not appear to be used)
   */
  constructor(private http: HttpClient, private route: Router) {
    var p = new Login();
    p.id = 0;
    this.changePrincipal(p);
  }

  getAuthToken(): string {
    return this.authToken;
  }

  getUserByEmail(email: string): Observable<Login> {
    console.log("getting by email")
    return this.http.get<Login>(environment.apiUrl + '/users', {
      params: { email }
    });
  }
  /**
   * Returns whether the current user is logged in as a Trainer
   */
  isTrainer(): boolean {

    return this.principalSource.value.role == "TRAINER" || this.isAdmin();
  }
  /**
   * Returns whether the current user is logged in as an Admin
   */
  isAdmin(): boolean {
    return this.principalSource.value.role == "ADMIN";
  }

  /**
   * Attempts to log the user in using Cognito
   * @param email The email address to be sent from the view to Cognito
   * @param password The password to be sent from the view to Cognito
   * @returns {null} - User mapped to token storage now
   */
  authenticator(email: string, password: string) {
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userPool = new CognitoUserPool(environment.cognitoData);

    const userData = {
      Username: email,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);

    return Observable.create(observer => {
      cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          //console.log(result);
          observer.next(result);
          observer.complete();
        },
        onFailure: function (err) {
          console.log(err);
          observer.error(err);
        },
      });
    }).toPromise();
  }

  /**
   * Attempts to log the user in and if successful, sets the sessionStorage
   * @param email - the user identifier
   * @param password - the password of the account
   * @param {boolean} usePromise - (TESTING) whether to use the promise version or stick with observable
   */
  authenticate(email: string, password: string, usePromise?: boolean) {
    this.authenticator(email, password).then(
      (x) => {
        this.authToken = x.idToken.jwtToken;
        this.getUserByEmail(email).subscribe(resp => {
          const l: Login = resp as Login;
          this.changePrincipal(l);
          this.route.navigate(['/landing']);
        });
      },
      (e) => {
        // error coming from the backend
        if (document) {
          const messageLogin = document.getElementById('errorMessageLogin');
          if (messageLogin) {
            messageLogin.style.display = 'block';
            messageLogin.style.color = 'red';
            console.log(e.message);
            if (e.message == 'GENERAL') {
              messageLogin.innerHTML = 'Server unavailable';
            } else if (e.message == 'undefined') {
              messageLogin.innerHTML = 'GATEWAY unavailable';
            } else {
              messageLogin.innerHTML = e.message;
            }
          }
        }
        return e.message;
      }
    );
  }

  /**
   * Logs the user out of the service
   */
  logout() {
    this.changePrincipal(null);
  }

  //Will resend the confirmation email
  resendConfirmation(email: string): Observable<void> {
    const user = this.createCognitoUser(email);
    return Observable.create(observer => {
      user.resendConfirmationCode(function (err, result) {
        if (err) {
          observer.error(err);
          return;
        }
        observer.next(result);
        observer.complete();
      });
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
  changePrincipal(p: Login) {
    this.principalSource.next(p);
  }




}
