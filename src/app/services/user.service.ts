import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private data: IUser | null = null;

  constructor() {}

  setData(data: IUser): void {
    this.data = data;
  }

  getUser(): IUser | null {
    return this.data;
  }

  hasUser(): boolean {
    return !!this.data;
  }
}
