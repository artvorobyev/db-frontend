import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IUser } from '../../interfaces/user.interfaces';
import { UserService } from '../../services/user.service';
import { LoginPopupComponent } from '../login-popup/login-popup.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: IUser | null;

  constructor(
    private modalService: NgbModal,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
  }

  openLoginPopup(): void {
    const modalRef = this.modalService.open(LoginPopupComponent);
    modalRef.componentInstance.instance = modalRef;
  }
}
