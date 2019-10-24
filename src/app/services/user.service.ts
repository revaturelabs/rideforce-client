import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { Role } from '../models/role';
import { Location } from '../models/location';


@Injectable({
  providedIn: 'root'
})
export class UserService {

   /**
   * Sets up the User Service via the Injection of the HttpClient
   * @param {HttpClient} http - Allows service to communicate with the server via HTTP requests
   */
  constructor(private http: HttpClient) { }

  /** to be used with the url provided by back end */
  private url = '';

  /** Is the user currently logged in? */
  isLoggedIn: boolean;
  /** Who is the current user of the system? */
  currentUser: User;

  /** Holds a list of users (does not appear to be used) */
  // private users: User[] = [];




  register (userVar : User){
    const role : Role = {
      rid : 1,
      rname : "rider"
    };

    const roles : [Role] = [
      role
    ];

    const loc : Location = {
      lid : 1,
      address : "123 Cool Street",
      city : "Morgantown",
      state : "WV",
      zip : 26508,
      longitude : 39.6295,
      latitude : 79.9559
    };

    const u : User = {
      uid : 1,
      email : "test@testarino.com",
      password : "password",
      fname : "Ali",
      lname : "Hammoud",
      roles : roles, 
      location : loc,
      is_active : true
    };
    return u; 
  };


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

}
