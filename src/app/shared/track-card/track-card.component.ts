import { Component, Input, OnInit } from '@angular/core';
import { ITrack } from '../../interfaces/tracks.interfaces';

@Component({
  selector: 'app-track-card',
  templateUrl: './track-card.component.html',
  styleUrls: ['./track-card.component.scss'],
})
export class TrackCardComponent implements OnInit {
  @Input() track: ITrack;

  constructor() {}

  ngOnInit(): void {}
}
