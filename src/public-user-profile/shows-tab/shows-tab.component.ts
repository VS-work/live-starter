import { Component, Input } from '@angular/core';

import { ShowInfo } from '../../shared/show-info/info.interface';

@Component({
  selector: 'app-shows-tab',
  templateUrl: './shows-tab.component.html',
  styleUrls: ['./shows-tab.component.scss']
})

export class ShowsTabComponent {
  @Input() shows: ShowInfo[];
}
