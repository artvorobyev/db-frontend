import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { IPlaylist } from '../../interfaces/playlists.interfaces';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-playlists-page',
  templateUrl: './playlists-page.component.html',
  styleUrls: ['./playlists-page.component.scss'],
})
export class PlaylistsPageComponent extends OnDestroyMixin implements OnInit {
  loading = true;
  query: string;
  playlists: IPlaylist[];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.query = this.route.snapshot.queryParamMap.get('q') ?? '';
    this.apiService
      .getPlaylists(this.query)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (response) => {
          this.playlists = response.data;
          this.loading = false;
        },
        (error: HttpErrorResponse) => {
          this.toastService.showError(error.error.error ?? error.message);
        }
      );
  }
}
