import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { IPlaylist } from '../../interfaces/playlists.interfaces';
import { ITrackReaction } from '../../interfaces/reactions.intrefaces';
import { ITrack } from '../../interfaces/tracks.interfaces';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';
import { CreatePlaylistPopupComponent } from '../create-playlist-popup/create-playlist-popup.component';

@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.scss'],
})
export class TrackCardComponent extends OnDestroyMixin implements OnInit {
  @Input() track: ITrack;
  isLiked: boolean;
  isDisliked: boolean;

  playlists$: Observable<IPlaylist[]>;

  constructor(
    private apiService: ApiService,
    private toastService: ToastService,
    private userService: UserService,
    private modalService: NgbModal
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.track.reaction) {
      this.isLiked = this.track.reaction.is_positive;
      this.isDisliked = !this.track.reaction.is_positive;
    }

    this.playlists$ = this.userService.data$.pipe(
      map((user) => (user ? user.playlists : []))
    );
  }

  like(): void {
    if (!this.userService.hasUser()) {
      this.toastService.showError('Вы не авторизованы');
      return;
    }
    this.isLiked = !this.isLiked;
    this.isDisliked = false;
    this.saveReaction();
  }

  dislike(): void {
    if (!this.userService.hasUser()) {
      this.toastService.showError('Вы не авторизованы');
      return;
    }
    this.isLiked = false;
    this.isDisliked = !this.isDisliked;
    this.saveReaction();
  }

  saveReaction(): void {
    const reaction: ITrackReaction = {
      track_id: this.track.id,
      is_positive: this.isLiked,
    };
    const method =
      !this.isLiked && !this.isDisliked
        ? this.apiService.deleteTrackReaction(this.track.id)
        : this.apiService.createTrackReaction(reaction);

    method.pipe(untilComponentDestroyed(this)).subscribe(
      () => {
        this.toastService.showSuccess('Реакция на трек сохранена');
      },
      (error: HttpErrorResponse) => {
        this.toastService.showError(error.error.error || error.message);
      }
    );
  }

  openCreatePlaylistPopup(): void {
    if (!this.userService.hasUser()) {
      this.toastService.showError('Вы не авторизованы');
      return;
    }

    const modalRef = this.modalService.open(CreatePlaylistPopupComponent);
    modalRef.componentInstance.instance = modalRef;
    modalRef.closed
      .pipe(
        switchMap((playlist: IPlaylist) =>
          this.userService.updateUser().pipe(map(() => playlist))
        ),
        untilComponentDestroyed(this)
      )
      .subscribe((playlist) => {
        this.toastService.showSuccess(`Плейлист ${playlist.name} создан`);
      });
  }

  addTrackToPlaylist(playlist: IPlaylist): void {
    this.apiService
      .addTrackToPlaylist({
        trackId: this.track.id,
        playlistId: playlist.id,
      })
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        () => {
          this.toastService.showSuccess(
            `Трек «${this.track.name}» добавлен в плейлист «${playlist.name}»`
          );
        },
        (error: HttpErrorResponse) => {
          this.toastService.showError(error.error.error || error.message);
        }
      );
  }
}
