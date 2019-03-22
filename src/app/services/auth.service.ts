import { Router } from '@angular/router';
import { Login } from '../models/login.model';
import { Injectable } from '@angular/core';
import { Role } from '../models/role.model';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthenticationDetails, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';
import { User } from '../models/user.model';

/**
 * Allows Users to authenticate themselves with the server
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private principalSource = new BehaviorSubject(new User());
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
    const p = new User();
    p.id = 0;
    this.changePrincipal(p);
  }

  cognitoUser: CognitoUser;
  // Will resend the confirmation email
  resendConfirmation(email: string): Observable<void> {
    const userPool = new CognitoUserPool(environment.cognitoData);

    const userData = {
      Username : email,
      Pool : userPool
    };
    this.cognitoUser = new CognitoUser(userData);
    return Observable.create(observer => {
      this.cognitoUser.resendConfirmationCode(function(err, result) {
        if (err) {
            observer.error(err);
            return;
        }
        observer.next(result);
        observer.complete();
      });
    });
  }


  /**
   * Attempts to log the user in using Cognito
   * @param email The email address to be sent from the view to Cognito
   * @param password The password to be sent from the view to Cognito
   * @returns {null} - User mapped to token storage now
   */
  authenticator(email: string, password: string) {
    const authenticationData = {
      Username : email,
      Password : password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const userPool = new CognitoUserPool(environment.cognitoData);

    const userData = {
      Username : email,
      Pool : userPool
    };
    this.cognitoUser = new CognitoUser(userData);

    return Observable.create(observer => {
      this.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          observer.next(result);
          observer.complete();
        },
        onFailure: function(err) {
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
        this.getUserByEmail(email).subscribe(resp => {
          console.log('Retrieved email of user');
          const l: User = resp as User;
          l.authToken = x.idToken.jwtToken;
          this.authToken = l.authToken;
          this.changePrincipal(l);
          this.route.navigate(['/landing']);
        },
        error => {
          this.cognitoUser.signOut();
        });
      },
      (e) => {
        // error coming from the backend
        console.log('Printing Login error (Promise Mode)!');
        console.log(e);
        if (document) {
          const messageLogin = document.getElementById('errorMessageLogin');
          console.log(messageLogin);
          if (messageLogin) {
            messageLogin.style.display = 'block';
            console.log(e.message);
            if (e.message == 'GENERAL') {
              messageLogin.innerHTML = 'Server unavailable';
            } else if (e.message == 'undefined') {
              messageLogin.innerHTML = 'GATEWAY unavailable';
            } else if (e.message == 'User is not confirmed.'){
              messageLogin.innerHTML = e.message+' <a class="underlineHover" data-toggle="modal" data-target="#resendModal" '+
                      '(click)="initModal()"href="javascript:;">Resend Confirmation.</a>';
            }else{
              messageLogin.innerHTML = e.message;
            }
          }
        }
      }
      console.log('before return: ' + e.message);
      return e.message;
    });
  }

  checkAuthenticate() {
    console.log('calling check auth');
    const userPool = new CognitoUserPool(environment.cognitoData);
    const cognitoUser = userPool.getCurrentUser();
    if (cognitoUser != null) {
      cognitoUser.getSession(function(err, session) {
        if (err) {
            alert(err.message || JSON.stringify(err));
            return;
        }
        this.authToken = session.idToken.jwtToken;
        console.log(this.authToken);
        cognitoUser.getUserAttributes(function(err, attributes) {
            if (err) {
                // Handle error
            } else {
              console.log('attributes:');
              console.log(attributes);
              let email = '';
              for (let i = 0; i < attributes.length; i++) {
                if (attributes[i].getName() == 'email') {
                  email = attributes[i].getValue();
                }
              }
              console.log('email:' + email);
              this.getUserByEmail(email).subscribe(resp => {
                console.log('Retrieved email of user');
                const l: User = resp as User;
                l.authToken = session.idToken.jwtToken;
                this.authToken = l.authToken;
                // console.log(l);
                this.changePrincipal(l);
              });
            }
        }.bind(this));
      }.bind(this));
    }
  }

  /**
   * Returns whether the current user is logged in as a Trainer
   */
  isTrainer(): boolean {
    return this.principalSource.value.role === Role.Trainer || this.isAdmin();
  }

  /**
   * Returns whether the current user is logged in as an Admin
   */
  isAdmin(): boolean {
    return this.principalSource.value.role === Role.Admin;
  }

  /**
   * Logs the user out of the service
   */
  logout() {
    console.log('Logging out.');
    const userPool = new CognitoUserPool(environment.cognitoData);
    this.cognitoUser = userPool.getCurrentUser();
    this.cognitoUser.signOut();
  }

  changePrincipal(p: User) {
    this.principalSource.next(p);
  }

  getAuthToken(): string {
    console.log("Token is being generated. ");
    return this.authToken;
  }

  getUserByEmail(email: string): Observable<User> {
    console.log('getting by email');
    return this.http.get<User>(environment.userUrl + '/users', {
      params: { email }});
  }
}
