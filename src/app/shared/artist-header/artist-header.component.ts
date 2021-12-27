import { Component, Input, OnInit } from '@angular/core';
import { IArtist } from '../../interfaces/artists.interfaces';

@Component({
  selector: 'app-artist-header',
  templateUrl: './artist-header.component.html',
  styleUrls: ['./artist-header.component.scss'],
})
export class ArtistHeaderComponent implements OnInit {
  @Input() artist: IArtist;

  constructor() {}

  ngOnInit(): void {}
}
