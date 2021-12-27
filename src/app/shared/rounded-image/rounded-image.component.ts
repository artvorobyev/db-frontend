import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rounded-image',
  templateUrl: './rounded-image.component.html',
  styleUrls: ['./rounded-image.component.scss'],
})
export class RoundedImageComponent implements OnInit {
  @Input() image: string | null;

  constructor() {}

  ngOnInit(): void {}
}
