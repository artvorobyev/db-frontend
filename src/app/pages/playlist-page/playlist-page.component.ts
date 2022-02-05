import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { IPlaylist } from '../../interfaces/playlists.interfaces';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { EditPlaylistPopupComponent } from '../../shared/edit-playlist-popup/edit-playlist-popup.component';

@Component({
  selector: 'app-playlist-page',
  templateUrl: './playlist-page.component.html',
  styleUrls: ['./playlist-page.component.scss'],
})
export class PlaylistPageComponent extends OnDestroyMixin implements OnInit {
  playlist: IPlaylist;
  playlistId: number;
  loading = true;
  isEditable = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastService: ToastService,
    private userService: UserService,
    private modalService: NgbModal
  ) {
    super();
  }

  ngOnInit(): void {
    this.playlistId = Number(this.route.snapshot.paramMap.get('playlistId'));
    this.apiService
      .getPlaylist(this.playlistId)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (response) => {
          this.playlist = response.data;
          this.loading = false;
          this.isEditable =
            this.playlist.user_id === this.userService.getUser()?.id;
        },
        (error: HttpErrorResponse) => {
          this.toastService.showError(error.error.error ?? error.message);
        }
      );
  }

  editPlaylist(): void {
    const modal = this.modalService.open(EditPlaylistPopupComponent, {
      scrollable: true,
    });
    modal.componentInstance.instance = modal;
    modal.componentInstance.playlist = this.playlist;
    modal.closed.pipe(untilComponentDestroyed(this)).subscribe(
      (playlist?: IPlaylist) => {
        if (playlist) {
          this.playlist = playlist;
          this.toastService.showSuccess(
            `Плейлист «${playlist.name}» успешно обновлен`
          );
        }
      },
      (error) => {
        this.toastService.showError(error.error.error ?? error.message);
      }
    );
  }

  deletePlaylist(): void {
    this.apiService
      .deletePlaylist(this.playlistId)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        () => {
          this.toastService.showSuccess(
            `Плейлист «${this.playlist.name}» успешно удален`
          );
          this.router.navigate(['/cabinet']);
        },
        (error: HttpErrorResponse) => {
          this.toastService.showError(error.error.error ?? error.message);
        }
      );
  }
}
