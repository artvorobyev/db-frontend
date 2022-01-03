import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { ITrackReaction } from '../../interfaces/reactions.intrefaces';
import { ITrack } from '../../interfaces/tracks.interfaces';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.scss'],
})
export class TrackCardComponent extends OnDestroyMixin implements OnInit {
  @Input() track: ITrack;
  isLiked: boolean;
  isDisliked: boolean;

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    if (this.track.reaction) {
      this.isLiked = this.track.reaction.is_positive;
      this.isDisliked = !this.track.reaction.is_positive;
    }
  }

  like(): void {
    this.isLiked = !this.isLiked;
    this.isDisliked = false;
    this.saveReaction();
  }

  dislike(): void {
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
}
