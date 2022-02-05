import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { IGenre } from '../../interfaces/genres.interfaces';
import { ApiService } from '../../services/api.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-genres-page',
  templateUrl: './genres-page.component.html',
  styleUrls: ['./genres-page.component.scss'],
})
export class GenresPageComponent extends OnDestroyMixin implements OnInit {
  loading = true;
  genres: IGenre[];

  constructor(
    private apiService: ApiService,
    private toastService: ToastService
  ) {
    super();
  }

  ngOnInit(): void {
    this.apiService
      .getGenres()
      .pipe(untilComponentDestroyed(this))
      .subscribe(
        (result) => {
          this.loading = false;
          this.genres = [...result.data.genres].sort(function (a, b) {
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
          this.toastService.showError(error.message);
        }
      );
  }
}
