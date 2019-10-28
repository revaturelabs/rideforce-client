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
  private head = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });

  private options = { headers: this.head }
  /**
   * Sets up the User Service via the Injection of the HttpClient
   * @param {HttpClient} http - Allows service to communicate with the server via HTTP requests
   */
  constructor(private http: HttpClient, private router: Router) { }


  /** Is the user currently logged in? */
  isLoggedIn: boolean = !(sessionStorage.getItem('currentUser') === '');


  /** Holds a list of users (does not appear to be used) */
  // private users: User[] = [];


  register(user: User) {
    return this.http.post<User>(this.host + '/users', user, this.options);
  }

  login(user : User) : Observable<User> {
    console.log(user)
    return this.http.post<User>(this.host + '/users/login', user, this.options);
  }

  logout() {
    sessionStorage.setItem('currentUser', '');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }


  allUsers() : Observable<User[]> {
    return this.http.get<User[]>(this.host + '/users');
  }

  allDrivers() : Observable<User[]> {
    return this.http.get<User[]>(this.host + '/users/drivers?isActive=true');
  }
  
  updateUser(user : User) : Observable<User> {

    return this.http.put<User>(this.host + '/users/' + user.uid, user, this.options);
  }

}
