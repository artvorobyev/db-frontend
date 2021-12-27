import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { IArtist } from '../../interfaces/artists.interfaces';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-artists-page',
  templateUrl: './artists-page.component.html',
  styleUrls: ['./artists-page.component.scss'],
})
export class ArtistsPageComponent extends OnDestroyMixin implements OnInit {
  loading = true;
  query: string;
  artists: IArtist[];

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
        .getArtists(query)
        .pipe(untilComponentDestroyed(this))
        .subscribe(
          (result) => {
            this.loading = false;
            this.artists = result.data.artists;
          },
          (error: HttpErrorResponse) => {
            this.loading = false;
            this.toastService.showError(error.message);
          }
        );
    }
  }
}
