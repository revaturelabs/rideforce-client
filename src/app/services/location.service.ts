import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  constructor(private http: HttpClient, private router: Router) { }

  getLocation(): Observable<Location> {
    return this.http.get<Location>('enviornment.userUrl' + '/users');
  }
  
  setLocation(loc: Location): Observable<Location> {
    return this.http.post<Location>('enviornment.userUrl' + '/users', loc);
  }
}
