import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { IGenreWithAlbums } from '../../interfaces/genres.interfaces';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-genre-page',
  templateUrl: './genre-page.component.html',
  styleUrls: ['./genre-page.component.scss'],
})
export class GenrePageComponent extends OnDestroyMixin implements OnInit {
  loading = true;
  genreId: number;
  genre: IGenreWithAlbums;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.genreId = Number(this.route.snapshot.paramMap.get('genreId'));

    this.apiService
      .getGenre(this.genreId)
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (result) => {
          this.loading = false;
          this.genre = result.data;
        },
        (error: HttpErrorResponse) => {
          this.loading = false;
          this.toastService.showError(error.error.error || error.message);
        }
      );
  }
}
