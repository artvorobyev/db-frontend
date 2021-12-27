import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { IArtistWithItems } from '../../interfaces/artists.interfaces';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-artist-page',
  templateUrl: './artist-page.component.html',
  styleUrls: ['./artist-page.component.scss'],
})
export class ArtistPageComponent extends OnDestroyMixin implements OnInit {
  loading = true;
  artist: IArtistWithItems;
  active = 1;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    const artistId = Number(this.route.snapshot.paramMap.get('artistId'));
    if (artistId) {
      this.apiService
        .getArtist(artistId)
        .pipe(untilComponentDestroyed(this))
        .subscribe(
          (response) => {
            this.loading = false;
            this.artist = response.data;
          },
          (error: HttpErrorResponse) => {
            console.log(error);
            this.toastService.showError(error.error.error);
          }
        );
    }
  }
}
