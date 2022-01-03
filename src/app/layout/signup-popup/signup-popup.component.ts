import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { reloadPage } from '../../helpers/helpers';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-signup-popup',
  templateUrl: './signup-popup.component.html',
  styleUrls: ['./signup-popup.component.scss'],
})
export class SignupPopupComponent extends OnDestroyMixin implements OnInit {
  instance: NgbModalRef;
  loading = false;

  email: string;
  login: string;
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
    if (!this.email || !this.password || !this.login) {
      return;
    }

    this.loading = true;
    this.apiService
      .createUser({
        email: this.email,
        password: this.password,
        login: this.login,
      })
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        () => {
          reloadPage();
        },
        (error: HttpErrorResponse) => {
          console.log(error);
          this.loading = false;
          this.toastService.showError(error.error.error || error.message);
        }
      );
  }
}
