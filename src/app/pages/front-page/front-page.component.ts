import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

enum ESearchType {
  artists = 'artists',
  albums = 'albums',
  tracks = 'tracks',
  playlists = 'playlists',
}

@Component({
  selector: 'app-front-page',
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
})
export class FrontPageComponent implements OnInit {
  type = ESearchType.artists;
  q: string = '';

  options = [
    { value: ESearchType.artists, label: 'По артистам' },
    { value: ESearchType.tracks, label: 'По трекам' },
    { value: ESearchType.albums, label: 'По альбомам' },
    { value: ESearchType.playlists, label: 'По плейлистам' },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.q || !this.type) {
      return;
    }

    this.router.navigate([this.type], {
      queryParams: {
        q: this.q,
      },
    });
  }
}
