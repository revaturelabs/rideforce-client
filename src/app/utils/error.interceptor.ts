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

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

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