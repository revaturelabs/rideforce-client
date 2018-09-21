import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, mapTo } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { UserControllerService } from '../../app/services/api/user-controller.service';


@Injectable({
    providedIn: 'root',
  })
  export class AccessGuard implements CanActivate {
    constructor(private userService: UserControllerService, private router: Router) {}
  
    // RouterStateSnapshot to cache the url attempted to be accessed on the auth service
    // after user logs in, use this url to direct them to the page they want
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): boolean | Observable<boolean> {
      if (route.data.requiresLogin) {
        return this.userService.getCurrentUser().pipe(
          mapTo(true),
          catchError(_ => {
            this.router.navigate(['login']);
            return of(false);
          })
        );
      }
      return true;
    }
  }