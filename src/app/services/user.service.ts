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


  login(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    return this.http.post<User>('enviornment.userUrl' + '/users', JSON.stringify(user));
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

  allDrivers() : Observable<User[]> {
    console.log("No drivers here to show!");
    return this.http.get<User[]>("http://ec2-3-133-13-98.us-east-2.compute.amazonaws.com:8888/users");
  }

}
