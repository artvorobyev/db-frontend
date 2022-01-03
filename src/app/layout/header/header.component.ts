import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { reloadPage } from '../../helpers/helpers';
import { IUser } from '../../interfaces/user.interfaces';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { LoginPopupComponent } from '../login-popup/login-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends OnDestroyMixin implements OnInit {
  user: IUser | null;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    private apiService: ApiService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  openLoginPopup(): void {
    const modalRef = this.modalService.open(LoginPopupComponent);
    modalRef.componentInstance.instance = modalRef;
  }

  logout(): void {
    this.apiService
      .logout()
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        () => {
          reloadPage();
        },
        (error: HttpErrorResponse) => {
          this.toastService.showError(error.error.error || error.message);
        }
      );
  }
}
