import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorage } from './token.storage';

/**
 * Ensures that each HTTP request we send has our authentication token
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  /**
   * Sets up our interceptor for token addition
   * @param tokenStorage - the Service that allows us to access our authentication token
   */
  constructor(private tokenStorage: TokenStorage) {}

  /**
   * Catches HTTP requests and adds the authentication token to its header
   * @param {HttpRequest<any>} request - the HTTP request to modify
   * @param {HttpHandler} next - the means of proceeding with the original request
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.tokenStorage.getToken();
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
