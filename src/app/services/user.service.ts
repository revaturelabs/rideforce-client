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

  host = "http://ec2-3-133-13-98.us-east-2.compute.amazonaws.com:8888";
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


  /** Is the user currently logged in? */
  isLoggedIn: boolean;


  /** Holds a list of users (does not appear to be used) */
  // private users: User[] = [];


  login(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    return this.http.post<User>('enviornment.userUrl' + '/users', JSON.stringify(user));
  }

  register(user: User) {
    return this.http.post<User>(this.host + '/users', user, {headers: this.headers});
  }

  logout() {
    localStorage.setItem('currentUser', '');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }

}
