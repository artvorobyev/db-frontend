import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-login-popup',
  templateUrl: './login-popup.component.html',
  styleUrls: ['./login-popup.component.scss'],
})
export class LoginPopupComponent extends OnDestroyMixin implements OnInit {
  instance: NgbModalRef;
  loading = false;

  email: string;
  password: string;

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {}

  close(): void {
    this.instance.close();
  }

  onSubmit(): void {
    if (!this.email || !this.password) {
      return;
    }

    this.loading = true;
    this.apiService
      .login({
        email: this.email,
        password: this.password,
      })
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        () => {
          window.location.assign(window.location.pathname);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.loading = false;
          this.toastService.showError(error.error.error || error.message);
        }
      );
  }
}
