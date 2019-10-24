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

  constructor(private http : HttpClient) { }

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
}
