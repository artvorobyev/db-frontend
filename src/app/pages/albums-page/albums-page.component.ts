import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { IAlbumWithArtists } from '../../interfaces/albums.interfaces';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-albums-page',
  templateUrl: './albums-page.component.html',
  styleUrls: ['./albums-page.component.scss'],
})
export class AlbumsPageComponent extends OnDestroyMixin implements OnInit {
  loading = true;
  query: string;
  albums: IAlbumWithArtists[];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    const query = this.route.snapshot.queryParamMap.get('q') ?? '';
    this.query = query;
    this.apiService
      .getAlbums(query)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (result) => {
          this.loading = false;
          this.albums = [...result.data.albums].sort(function (a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.toastService.showError(error.error.error || error.message);
        }
      );
  }
}
