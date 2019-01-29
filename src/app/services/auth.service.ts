import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
//import { TokenStorage } from './../utils/token.storage';
import { Login } from '../classes/login';
//import { UserControllerService } from './api/user-controller.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { logging } from 'protractor';

/**
 * Allows Users to authenticate themselves with the server
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private principalSource = new BehaviorSubject(new Login());
  principal = this.principalSource.asObservable();
  authToken :string;
  /**
   * Sets up the Authentication service with the required dependencies
   * @param {HttpClient} http - Our http client dependency for making http requests
   * @param {UserControllerService} userService - Service used to grab any user information from the API
   * @param {TokenStorage} tokenStorage - Used to save our generated token locally
   * @param {Router} route - enables navigation between components (does not appear to be used)
   */
  constructor(
    private http: HttpClient,
    //private userService: UserControllerService,
    //private tokenStorage: TokenStorage 
    private route: Router
  ) { 
    var p = new Login();
    p.id = 0;
    this.changePrincipal(p);
  }

  /**
   * Attempts to log the user in
   * @param email The email address to be sent from the view to the API
   * @param password The password to be sent from the view to the API
   * @returns {null} - User mapped to token storage now
   */
  authenticator(email: string, password: string) {
    const credentials = { email, password };
    console.log('in authenticate');
    return this.http
      .post<string>(environment.apiUrl + '/login', credentials)
      .pipe(
        map<string, void>(token => {
          console.log('Saving token');
          this.authToken = token;

        })
      ).toPromise();
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
        console.log('Got user from Authenticate (Promise mode)');
        this.getUserByEmail(email).subscribe(resp =>{
          console.log('Retrieved email of user');
          const l : Login = resp as Login;
          this.changePrincipal(l);
          console.log("sending to landing");
          this.route.navigate(['/landing']);
        });
      },
      (e) => {
        // error coming from the backend
        console.log('Printing Login error (Promise Mode)!');
        console.log(e);
        if (document) {
          const messageLogin = document.getElementById('errorMessageLogin');
          if (messageLogin) {
            messageLogin.style.display = 'block';
            console.log(e.message);
            if (e.message == 'GENERAL') {
              messageLogin.innerHTML = 'Server unavailable';
            } else if(e.message == 'undefined') {
              messageLogin.innerHTML = 'GATEWAY unavailable';
            }else{
              messageLogin.innerHTML = e.message;
            }
          }
        }
        return e.message;
      }
    );
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
   * Logs the user out of the service
   */
  logout() {
    this.changePrincipal(null);
  }
  changePrincipal(p : Login){
    this.principalSource.next(p);
  }
  getAuthToken() :string{
    return this.authToken;
  }



  getUserByEmail(email : string): Observable<Login> {
    console.log("getting by email")
    return this.http.get<Login>(environment.apiUrl + '/users', {
      params: { email }});
  }



}
