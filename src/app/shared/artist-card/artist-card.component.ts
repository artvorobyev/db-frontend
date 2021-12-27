import { Component, Input, OnInit } from '@angular/core';
import { IArtist } from '../../interfaces/artists.interfaces';

@Component({
  selector: 'app-artist-card',
  templateUrl: './artist-card.component.html',
  styleUrls: ['./artist-card.component.scss'],
})
export class ArtistCardComponent implements OnInit {
  @Input() artist: IArtist;

  constructor() {}

  ngOnInit(): void {}
}
