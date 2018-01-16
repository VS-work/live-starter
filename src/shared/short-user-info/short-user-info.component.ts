import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-short-user-info',
  templateUrl: './short-user-info.component.html',
  styleUrls: ['./short-user-info.component.scss']
})
export class ShortUserInfoComponent {
  @Input() info: {
    avatar: string;
    name: string;
    showLocation: string;
  };
  @Input() isLocation = true;

  constructor() {

  }
}
