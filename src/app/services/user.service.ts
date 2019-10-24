import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from 'rxjs';

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
  currentUser?: User;

  /** Holds a list of users (does not appear to be used) */
  // private users: User[] = [];




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
