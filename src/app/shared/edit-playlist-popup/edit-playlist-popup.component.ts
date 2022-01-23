import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { IPlaylistWithTracks } from '../../interfaces/playlists.interfaces';
import { ITrackWithDetails } from '../../interfaces/tracks.interfaces';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-edit-playlist-popup',
  templateUrl: './edit-playlist-popup.component.html',
  styleUrls: ['./edit-playlist-popup.component.scss'],
})
export class EditPlaylistPopupComponent
  extends OnDestroyMixin
  implements OnInit
{
  instance: NgbModalRef;
  loading = false;
  playlist: IPlaylistWithTracks;

  name: string;
  isPublic: boolean;
  tracks: ITrackWithDetails[] = [];

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.name = this.playlist.name;
    this.isPublic = this.playlist.is_public;

    this.tracks = this.playlist.tracks ? [...this.playlist.tracks] : [];
  }

  onSubmit(): void {
    this.loading = true;
    this.apiService
      .updatePlaylist(this.playlist.id, {
        name: this.name,
        is_public: this.isPublic,
        tracks: this.tracks.map((track) => track.id),
      })
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (response) => {
          this.instance.close(response.data);
        },
        (error) => {
          this.loading = false;
          this.toastService.showError(error.error.error ?? error.message);
        }
      );
  }

  close(): void {
    this.instance.close();
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.tracks, event.previousIndex, event.currentIndex);
  }

  deleteTrack(track: ITrackWithDetails): void {
    this.tracks = [...this.tracks].filter((item) => track.id !== item.id);
  }
}
