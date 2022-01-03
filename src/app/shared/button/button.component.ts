import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() disabled = false;
  @Input() loading = false;
  @Input() color: string = 'success';
  @Input() type: 'submit' | 'button' = 'button';

  constructor() {}

  ngOnInit(): void {}
}
