import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
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

  async authenticate(email: string, password: string, usePromise?: boolean) {
    if (usePromise) {
      await this.authenticator(email, password).toPromise().then(
        (x) => {
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
          });
          sessionStorage.setItem('userEmail', email);
          sessionStorage.setItem('userPassword', password);
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
                if(e.message=='GENERAL'){
                  messageLogin.innerHTML = "Server unavailable";
                }else{
                  messageLogin.innerHTML = e.message;
                }
              }
            }
            return e.message;
        }
      );
    } else {
    this.authenticator(email, password).subscribe(
      (x) => {
        console.log('Got user from Authenticate (Observe mode)');
        this.userService.getUserByEmail(email).then((x) => {
          console.log('Gotten email of user');
          sessionStorage.setItem('id', x.id.toString());
          sessionStorage.setItem('firstName', x.firstName);
          sessionStorage.setItem('lastName', x.lastName);
          sessionStorage.setItem('active', x.active.toString());
          sessionStorage.setItem('role', x.role);
          sessionStorage.setItem('address', x.address);
          sessionStorage.setItem('batchEnd', x.batchEnd);
        });
        sessionStorage.setItem('userEmail', email);
        sessionStorage.setItem('userPassword', password);
        location.reload(true);
    },
      // TODO if an error is returned, return the error message to user
      // callback called if there is an error
      e => {
        // error coming from the backend
        console.log('Printing Login error (Observe Mode)!');
        console.log(e);
        if (document) {
          const messageLogin = document.getElementById('errorMessageLogin');
          if (messageLogin) {
            messageLogin.style.display = 'block';
            //It is possible that the shortcircuit message means something completely different
            //from the server being unavailable. I'm not really sure, but it could be
            //proccing whenever you just click waaaaay too fast trying to log in.
            if(e.message=='GENERAL' || e.message=='SHORTCIRCUIT'){
              messageLogin.innerHTML = "Server unavailable";
            }else{
              messageLogin.innerHTML = e.message;
            }
          }
        }
        return e.message;
      }
    );
    }
  }

  logout() {
    // Make sure we invalidate the currently cached user data in the
    // UserService.
    this.userService.invalidateCurrentUser();
    this.tokenStorage.signOut();
  }

}
