import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  OnDestroyMixin,
  untilComponentDestroyed,
} from '@w11k/ngx-componentdestroyed';
import { IAlbumWithItems } from '../../interfaces/albums.interfaces';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-album-page',
  templateUrl: './album-page.component.html',
  styleUrls: ['./album-page.component.scss'],
})
export class AlbumPageComponent extends OnDestroyMixin implements OnInit {
  loading = true;
  album: IAlbumWithItems;

  constructor(private apiService: ApiService, private route: ActivatedRoute) {
    super();
  }

  ngOnInit(): void {
    const albumId = Number(this.route.snapshot.paramMap.get('albumId'));
    this.apiService
      .getAlbum(albumId)
      .pipe(untilComponentDestroyed(this))
      .subscribe((response) => {
        this.loading = false;
        this.album = response.data;
      });
  }
}
