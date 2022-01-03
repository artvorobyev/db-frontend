import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { IUpdateUserData } from '../../interfaces/user.interfaces';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss'],
})
export class SettingsPageComponent extends OnDestroyMixin implements OnInit {
  active = 1;
  loading = false;

  email: string;
  password: string;

  currentPassword: string;
  newPassword: string;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    const user = this.userService.getUser();
    this.email = user ? user.email : '';
  }

  updateEmail(event: Event): void {
    event.preventDefault();
    this.updateFields({
      email: this.email,
      password: this.password,
    });
  }

  updatePassword(event: Event): void {
    event.preventDefault();
    this.updateFields({
      password: this.currentPassword,
      newPassword: this.newPassword,
    });
  }

  updateFields(fields: IUpdateUserData): void {
    this.loading = true;
    this.apiService
      .updateUser(fields)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        () => {
          this.toastService.showSuccess('Данные успешно сохранены');
          this.loading = false;
        },
        (error: HttpErrorResponse) => {
          this.toastService.showError(error.error.error || error.message);
          this.loading = false;
        }
      );
  }
}
