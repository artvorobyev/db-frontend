import { Component, Input, OnInit } from '@angular/core';
import { IPlaylist } from '../../interfaces/playlists.interfaces';

@Component({
  selector: 'app-playlist-card',
  templateUrl: './playlist-card.component.html',
  styleUrls: ['./playlist-card.component.scss'],
})
export class PlaylistCardComponent implements OnInit {
  @Input() playlist: IPlaylist;

  constructor() {}

  ngOnInit(): void {}
}
