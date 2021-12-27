import { Component, Input, OnInit } from '@angular/core';
import { IAlbumWithItems } from '../../interfaces/albums.interfaces';

@Component({
  selector: 'app-album-header',
  templateUrl: './album-header.component.html',
  styleUrls: ['./album-header.component.scss'],
})
export class AlbumHeaderComponent implements OnInit {
  @Input() album: IAlbumWithItems;

  constructor() {}

  ngOnInit(): void {}
}
