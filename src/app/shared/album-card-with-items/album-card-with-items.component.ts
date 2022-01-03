import { Component, Input, OnInit } from '@angular/core';
import { IAlbumWithArtists } from '../../interfaces/albums.interfaces';

@Component({
  selector: 'app-album-card-with-items',
  templateUrl: './album-card-with-items.component.html',
  styleUrls: ['./album-card-with-items.component.scss'],
})
export class AlbumCardWithItemsComponent implements OnInit {
  @Input() album: IAlbumWithArtists;

  constructor() {}

  ngOnInit(): void {}
}
