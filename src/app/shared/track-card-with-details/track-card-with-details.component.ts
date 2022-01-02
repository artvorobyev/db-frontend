import { Component, Input, OnInit } from '@angular/core';
import { ITrackWithDetails } from '../../interfaces/tracks.interfaces';

@Component({
  selector: 'app-track-card-with-details',
  templateUrl: './track-card-with-details.component.html',
  styleUrls: ['./track-card-with-details.component.scss'],
})
export class TrackCardWithDetailsComponent implements OnInit {
  @Input() track: ITrackWithDetails;

  constructor() {}

  ngOnInit(): void {}
}
