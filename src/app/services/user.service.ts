import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Location } from '../models/location';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * use headers in http calls to circumvent 
   */
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
    'x-rapidapi-key': '87de82526cmshe4c5e6d4b8edcedp126831jsn193b85d91e9b'
  });
  /**
   * Sets up the User Service via the Injection of the HttpClient
   * @param {HttpClient} http - Allows service to communicate with the server via HTTP requests
   */
  constructor(private http: HttpClient, private router: Router) { }

  /** to be used with the url provided by back end */
  private url = '';

  /** Is the user currently logged in? */
  isLoggedIn: boolean;
  /** Who is the current user of the system? */
  currentUser: User;

  /** Holds a list of users (does not appear to be used) */
  // private users: User[] = [];




  // register(userVar : User) {
  //   const role : Role = {
  //     rid : 1,
  //     rname : "rider"
  //   };

  //   const roles : [Role] = [
  //     role
  //   ];

  //   const loc : Location = {
  //     lid : 1,
  //     address : "123 Cool Street",
  //     city : "Morgantown",
  //     state : "WV",
  //     zip : 26508,
  //     longitude : 39.6295,
  //     latitude : 79.9559
  //   };

  //   const u : User = {
  //     uid : 1,
  //     email : "test@testarino.com",
  //     password : "password",
  //     fname : "Ali",
  //     lname : "Hammoud",
  //     roles : roles, 
  //     location : loc,
  //     is_active : true
  //   };
  //   return u; 
  // }


  /**
   * Gets a single user via the given endpoint and email
   * @param {string} email - the email of the user to retrieve
   * @returns {Observable<User>} - the user with the given email
   */
  getUserByEmail(email: string): Observable<User> {
    // Not used yet

    return this.http.get<User>('environment.userUrl' + '/users', {
      params: { email }
    });
  }

  login() {
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    return this.http.get<User>('enviornment.userUrl' + '/users?email=' + this.currentUser.email);
  }

  register() {
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    return this.http.post<User>('enviornment.userUrl' + '/users', this.currentUser);
  }

  logout() {
    localStorage.setItem('currentUser', '');
    this.currentUser = null;
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
