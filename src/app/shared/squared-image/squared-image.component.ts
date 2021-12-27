import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-squared-image',
  templateUrl: './squared-image.component.html',
  styleUrls: ['./squared-image.component.scss'],
})
export class SquaredImageComponent implements OnInit {
  @Input() image: string | null;

  constructor() {}

  ngOnInit(): void {}
}
