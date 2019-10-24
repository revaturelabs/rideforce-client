import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})

export class RoleService {
  
  constructor(private http: HttpClient, private router: Router) { }

  getRole() : Observable<Role> {
    return this.http.get<Role>('enviornment.userUrl' + '/users');
  }
  
  setLocation(role: Role) : Observable<Role> {
    return this.http.post<Role>('enviornment.userUrl' + '/users', role);
  }
  
}
