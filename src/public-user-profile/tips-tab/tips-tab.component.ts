import { Component, Input } from '@angular/core';

import { ShortUserInfo } from '../../shared/short-user-info/short-user-info.interface';

@Component({
  selector: 'app-tips-tab',
  templateUrl: './tips-tab.component.html',
  styleUrls: ['./tips-tab.component.scss']
})

export class TipsTabComponent {
  @Input() tipsInfo: ShortUserInfo[] = [];
}
