import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (this.userService.hasUser()) {
      return of(true);
    }

    return this.userService.updateUser().pipe(
      map(() => {
        if (route.data.isPrivate) {
          return this.userService.hasUser();
        }

        return true;
      }),
      catchError((error) => {
        console.log(error);
        return of(!route.data.isPrivate);
      })
    );
  }
}
