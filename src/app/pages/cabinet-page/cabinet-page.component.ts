import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { switchMap } from 'rxjs/operators';
import { IPlaylist } from '../../interfaces/playlists.interfaces';
import { ITrackWithDetails } from '../../interfaces/tracks.interfaces';
import { IUser } from '../../interfaces/user.interfaces';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { CreatePlaylistPopupComponent } from '../../shared/create-playlist-popup/create-playlist-popup.component';

@Component({
  selector: 'app-cabinet-page',
  templateUrl: './cabinet-page.component.html',
  styleUrls: ['./cabinet-page.component.scss'],
})
export class CabinetPageComponent extends OnDestroyMixin implements OnInit {
  user: IUser;
  tracks: ITrackWithDetails[];
  playlists: IPlaylist[];
  active = 1;
  loading = true;

  tracksFilter = 1;
  trackFiltersLabels = ['Не понравившиеся', 'Понравившиеся'];

  playlistsFilter = 2;
  playlistsFilterLabels = [
    'Не понравившиеся',
    'Понравившиеся',
    'Мои плейлисты',
  ];

  constructor(
    private toastService: ToastService,
    private modalService: NgbModal,
    private userService: UserService
  ) {
    super();
  }

  ngOnInit(): void {
    this.userService
      .updateUser()
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (user) => {
          if (user) {
            this.user = user;
            this.filterTracks(this.tracksFilter);
            this.filterPlaylists(this.playlistsFilter);
          }
          this.loading = false;
        },
        (error: HttpErrorResponse) => {
          this.toastService.showError(error.error.error || error.message);
        }
      );
  }

  filterTracks(filter: number): void {
    this.tracksFilter = filter;
    this.tracks = [...this.user.tracks].filter(
      (track) => filter === Number(track.reaction?.is_positive)
    );
  }

  filterPlaylists(filter: number): void {
    this.playlistsFilter = filter;
    this.playlists = [...this.user.playlists].filter((playlist) => {
      if (filter === 2) {
        return playlist.user_id === this.userService.getUser()?.id;
      }

      return true;

      // return filter === Number(playlist.reaction?.is_positive);
    });
  }

  onSelectTrackFilter(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filterTracks(Number(target.value));
  }

  onSelectPlaylistFilter(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filterPlaylists(Number(target.value));
  }

  openCreatePlaylistPopup(): void {
    const modalRef = this.modalService.open(CreatePlaylistPopupComponent);
    modalRef.componentInstance.instance = modalRef;
    modalRef.closed
      .pipe(
        switchMap(() => this.userService.updateUser()),
        untilComponentDestroyed(this)
      )
      .subscribe(
        (user) => {
          if (user) {
            this.user = user;
            this.filterPlaylists(this.playlistsFilter);
          }
        },
        (error: HttpErrorResponse) => {
          this.toastService.showError(error.error.error || error.message);
        }
      );
  }
}
