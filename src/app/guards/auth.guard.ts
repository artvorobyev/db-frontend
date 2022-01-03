import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private apiService: ApiService,
    private userService: UserService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    if (this.userService.hasUser()) {
      return of(true);
    }

    return this.apiService.getCurrentUser().pipe(
      map((response) => {
        if (response.data.user) {
          this.userService.setData(response.data.user);
        }

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
