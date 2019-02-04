import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { TokenStorage } from './token.storage';
import { Login } from '../models/login.model';

/**
 * Ensures that each HTTP request we send has our authentication token
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
principal: Login;
  /**
   * Sets up our interceptor for token addition
   * @param tokenStorage - the Service that allows us to access our authentication token
   */
  constructor(private tokenStorage: TokenStorage, private auth: AuthService) {
    this.auth.principal.subscribe(p =>{
      this.principal = p;
    });
  }

  /**
   * Catches HTTP requests and adds the authentication token to its header
   * @param {HttpRequest<any>} request - the HTTP request to modify
   * @param {HttpHandler} next - the means of proceeding with the original request
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    //console.log("inter")
    const token = this.auth.getAuthToken();
    //console.log(token);
    if (token != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return next.handle(request);
  }
}
