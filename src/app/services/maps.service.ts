import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { TransitiveCompileNgModuleMetadata } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class MapsService {

  /**
   * use headers in http calls to circumvent 
   */
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
    'x-rapidapi-key': '87de82526cmshe4c5e6d4b8edcedp126831jsn193b85d91e9b',
    'Access-Control-Allow-Origin': "*",
    "Access-Control-Allow-Methods": 'GET'
  });
  /**
   * Sets up the User Service via the Injection of the HttpClient
   * @param {HttpClient} http - Allows service to communicate with the server via HTTP requests
   */
  constructor(private http: HttpClient, private router: Router) { }

  url: string = "https://maps.googleapis.com/maps/api";
  API_KEY: string = "AIzaSyBLy7S0X7Yqye4f-9WI7UiTNfCPhJ_4bdE";

  getDistance(user1: User, user2: User) {
    

    
  }

}
