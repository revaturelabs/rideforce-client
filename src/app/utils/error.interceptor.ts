import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { ApiError, ApiErrorType } from '../models/api-error.model';
import { AuthService } from './../services/auth.service';

/**
 * Meant to catch any error occuring in an HTTP request
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  /**
   * Sets up our HTTP error handling with the services needed to handle them properly
   * @param {AuthService} authService - allows us to log out if the servier says we're not logged on
   * @param {Router} router - enables component routing
   */
  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Catches HTTP requests for errors and takes basic steps to inform devs about it (logs out if the servier says to log out)
   * @param request - the HTTP request to examine
   * @param next - the means of proceeding with out HTTP request
   */
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred.
          console.error('Network error:', err.error);
          return throwError(err.error);
        } else {
          // API error.
          const apiError = <ApiError>err.error;
          apiError.status = err.status;
          // Automatically log out if the error was due to being not logged in.
          if (apiError.type === ApiErrorType.NotLoggedIn) {
            this.authService.logout();
            this.router.navigate(['login']);
          }
          return throwError(apiError);
        }
      })
    );
  }
}
