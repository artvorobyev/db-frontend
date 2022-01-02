import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { ITrackWithDetails } from '../../interfaces/tracks.interfaces';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.scss'],
})
export class TracksPageComponent extends OnDestroyMixin implements OnInit {
  loading = true;
  query: string;
  tracks: ITrackWithDetails[];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    const query = this.route.snapshot.queryParamMap.get('q');
    if (query) {
      this.query = query;
      this.apiService
        .getTracks(query)
        .pipe(untilComponentDestroyed(this))
        .subscribe(
          (result) => {
            this.loading = false;
            this.tracks = result.data.tracks;
          },
          (error: HttpErrorResponse) => {
            this.loading = false;
            this.toastService.showError(error.message);
          }
        );
    }
  }
}
