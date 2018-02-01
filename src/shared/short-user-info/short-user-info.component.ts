import { Component, Input } from '@angular/core';

import { ShortUserInfo } from './short-user-info.interface';

@Component({
  selector: 'app-short-user-info',
  templateUrl: './short-user-info.component.html',
  styleUrls: ['./short-user-info.component.scss']
})
export class ShortUserInfoComponent {
  @Input() info: ShortUserInfo;
  @Input() isLocation = true;

  constructor() {

  }
}
