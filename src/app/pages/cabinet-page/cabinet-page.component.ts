import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { ITrackWithDetails } from '../../interfaces/tracks.interfaces';
import { IUser } from '../../interfaces/user.interfaces';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-cabinet-page',
  templateUrl: './cabinet-page.component.html',
  styleUrls: ['./cabinet-page.component.scss'],
})
export class CabinetPageComponent extends OnDestroyMixin implements OnInit {
  user: IUser;
  tracks: ITrackWithDetails[];
  active = 1;
  loading = true;

  tracksFilter = 1;
  trackFiltersLabels = ['Не понравившиеся', 'Понравившиеся'];

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.apiService
      .getCurrentUser()
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        ({ data }) => {
          const { user } = data;
          if (user) {
            this.user = user;
            this.filterTracks(this.tracksFilter);
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

  onSelectTrackFilter(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.filterTracks(Number(target.value));
  }
}
