import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IUser } from '../interfaces/user.interfaces';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private data = new BehaviorSubject<IUser | null>(null);
  readonly data$ = this.data;

  constructor(private apiService: ApiService) {}

  setData(data: IUser): void {
    this.data.next(data);
  }

  getUser(): IUser | null {
    return this.data.getValue();
  }

  hasUser(): boolean {
    return !!this.getUser();
  }

  updateUser(): Observable<IUser> {
    return this.apiService.getCurrentUser().pipe(
      map((response) => response.data.user),
      tap((user) => this.setData(user))
    );
  }
}
