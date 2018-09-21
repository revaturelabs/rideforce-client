import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserControllerService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any>{
    return this.http.post<any>("http://localhost:8081/Reimb/login", {email: email, password: password});
  }
  

}
