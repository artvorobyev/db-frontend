import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-create-playlist-popup',
  templateUrl: './create-playlist-popup.component.html',
  styleUrls: ['./create-playlist-popup.component.scss'],
})
export class CreatePlaylistPopupComponent
  extends OnDestroyMixin
  implements OnInit
{
  instance: NgbModalRef;
  loading = false;

  name: string;
  isPublic: boolean;

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.loading = true;
    this.apiService
      .createPlaylist({
        name: this.name,
        is_public: this.isPublic,
      })
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (response) => {
          this.loading = false;
          this.toastService.showSuccess(
            `Плейлист «${response.data.name}» успешно создан`
          );
          this.instance.close(response.data);
        },
        (error) => {
          this.loading = false;
          this.toastService.showError(error.error.error || error.message);
        }
      );
  }

  close(): void {
    this.instance.close();
  }
}
