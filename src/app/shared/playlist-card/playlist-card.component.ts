import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { IPlaylist } from '../../interfaces/playlists.interfaces';
import { IPlaylistReaction } from '../../interfaces/reactions.intrefaces';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss'],
})
export class PlaylistCardComponent extends OnDestroyMixin implements OnInit {
  @Input() playlist: IPlaylist;
  isLiked: boolean;
  isDisliked: boolean;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private apiService: ApiService
  ) {
    super();
  }

  ngOnInit(): void {
    this.resetReaction();
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
    const reaction: IPlaylistReaction = {
      playlist_id: this.playlist.id,
      is_positive: this.isLiked,
    };
    const method =
      !this.isLiked && !this.isDisliked
        ? this.apiService.deletePlaylistReaction(this.playlist.id)
        : this.apiService.createPlaylistReaction(reaction);

    method.pipe(untilComponentDestroyed(this)).subscribe(
      () => {
        this.toastService.showSuccess('Реакция на плейлист сохранена');
      },
      (error: HttpErrorResponse) => {
        this.toastService.showError(error.error.error || error.message);
        this.resetReaction();
      }
    );
  }

  private resetReaction(): void {
    if (this.playlist.reaction) {
      this.isLiked = this.playlist.reaction.is_positive;
      this.isDisliked = !this.playlist.reaction.is_positive;
    }
  }
}
