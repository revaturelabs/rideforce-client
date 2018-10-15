import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../../app/models/user.model';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { tap, map } from 'rxjs/operators';
import { UserControllerService } from './api/user-controller.service';
import { TokenStorage } from './../utils/token.storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  /**
   * 
   * @param http Our http client dependency for making http requests
   * @param userService Service used to grab any user information from the API 
   * @param tokenStorage Used to save our generated token locally 
   */
  constructor(
    private http: HttpClient,
    private userService: UserControllerService,
    private tokenStorage: TokenStorage,
    private route: Router
  ) { }
  /**
   * 
   * @param email The email address to be sent from the view to the API
   * @param password The password to be sent from the view to the API  
   */
  authenticator(email: string, password: string) {
    const credentials = { email, password };
    console.log('in authenticate');
    return this.http
      .post<string>(environment.apiUrl + '/login', credentials)
      .pipe(
        map<string, void>(token => {
          console.log('Saving token');
          this.tokenStorage.saveToken(token);
          this.userService.getCurrentUser().subscribe();
          return null;
        })
      );
  }

  authenticate(email: string, password: string, usePromise?: boolean) {
    this.authenticator(email, password).toPromise().then(
      () => {
        console.log('Got user from Authenticate (Promise mode)');
        this.userService.getUserByEmail(email).then((x) => {
          console.log('Gotten email of user');
          sessionStorage.setItem('id', x.id.toString());
          sessionStorage.setItem('firstName', x.firstName);
          sessionStorage.setItem('lastName', x.lastName);
          sessionStorage.setItem('active', x.active.toString());
          sessionStorage.setItem('role', x.role);
          sessionStorage.setItem('address', x.address);
          sessionStorage.setItem('batchEnd', x.batchEnd);
          sessionStorage.setItem('userEmail', email);
          sessionStorage.setItem('userPassword', password);
        });
        location.reload(true);
      },
      (e) => {
        // error coming from the backend
        console.log('Printing Login error (Promise Mode)!');
        console.log(e);
        if (document) {
          const messageLogin = document.getElementById('errorMessageLogin');
          if (messageLogin) {
            messageLogin.style.display = 'block';
            console.log(e.message);
            if (e.message == 'GENERAL') {
              messageLogin.innerHTML = "Server unavailable";
            } else {
              messageLogin.innerHTML = e.message;
            }
          }
        }
        return e.message;
      }
    );
  }

  logout() {
    sessionStorage.clear();
  }

}