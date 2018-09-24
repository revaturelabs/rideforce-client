import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../app/models/user.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap, map } from 'rxjs/operators';
import { UserControllerService } from './api/user-controller.service';
import { TokenStorage } from './../utils/token.storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private userService: UserControllerService,
    private tokenStorage: TokenStorage
  ) { }

  authenticate(email: string, password: string) {
    const credentials = { email, password };
    console.log('in authenticate');
    return this.http
      .post<string>(environment.apiUrl + '/login', credentials)
      .pipe(
        map<string, void>(token => {
          this.tokenStorage.saveToken(token);
          return null;
        })
      );      
  }

  logout() {
    // Make sure we invalidate the currently cached user data in the
    // UserService.
    this.userService.invalidateCurrentUser();
    this.tokenStorage.signOut();
  }

}
